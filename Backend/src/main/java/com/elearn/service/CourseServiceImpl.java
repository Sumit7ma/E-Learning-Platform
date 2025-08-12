package com.elearn.service;

import com.elearn.dto.CourseRequestDTO;
import com.elearn.dto.CourseResponseDTO;
import com.elearn.dto.SectionDTO;
import com.elearn.entity.Course;
import com.elearn.entity.Lecture;
import com.elearn.entity.Section;
import com.elearn.entity.StudentEnrollment;
import com.elearn.entity.User;
import com.elearn.repository.CourseRepository;
import com.elearn.repository.StudentEnrollmentRepository;
import com.elearn.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final FileStorageService fileStorageService;
    private final StudentEnrollmentRepository enrollmentRepository;

    @Override
    public void addCourse(CourseRequestDTO dto, String instructorEmail) {
        User instructor = userRepository.findByEmail(instructorEmail)
                .orElseThrow(() -> new RuntimeException("Instructor not found"));

        Course course = Course.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .thumbnail(dto.getThumbnail())
                .language(dto.getLanguage())
                .price(dto.getPrice())
                .tag(dto.getTag())
                .level(dto.getLevel())
                .instructor(instructor)
                .sections(new ArrayList<>()) // ✅ Initialize sections list
                .build();

        courseRepository.save(course);
    }

    @Override
    public CourseResponseDTO getCourseById(Long courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        CourseResponseDTO dto = modelMapper.map(course, CourseResponseDTO.class);
        dto.setInstructorName(course.getInstructor().getName());
        dto.setLevel(course.getLevel());

        if (course.getSections() != null && !course.getSections().isEmpty()) {
            List<SectionDTO> sectionDTOs = course.getSections().stream()
                    .map(section -> SectionDTO.builder()
                            .title(section.getTitle())
                            .lectures(section.getLectures() != null
                                    ? section.getLectures().stream()
                                        .map(Lecture::getTitle)
                                        .collect(Collectors.toList())
                                    : Collections.emptyList())
                            .build())
                    .collect(Collectors.toList());
            dto.setSections(sectionDTOs);
        } else {
            dto.setSections(Collections.emptyList());
        }

        return dto;
    }

    @Override
    public List<CourseResponseDTO> getAllCourses() {
        return courseRepository.findAll().stream()
                .map(course -> {
                    CourseResponseDTO dto = modelMapper.map(course, CourseResponseDTO.class);
                    dto.setInstructorName(course.getInstructor().getName());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<CourseResponseDTO> getCoursesByInstructorEmail(String email) {
        User instructor = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Instructor not found"));

        return courseRepository.findByInstructor(instructor).stream()
                .map(course -> {
                    CourseResponseDTO dto = modelMapper.map(course, CourseResponseDTO.class);
                    dto.setInstructorName(instructor.getName());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void deleteCourseByIdAndInstructor(Long id, String instructorEmail) {
        User instructor = userRepository.findByEmail(instructorEmail)
                .orElseThrow(() -> new RuntimeException("Instructor not found"));

        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        if (!course.getInstructor().getId().equals(instructor.getId())) {
            throw new RuntimeException("Unauthorized to delete this course");
        }

        courseRepository.delete(course);
    }

    @Override
    @Transactional
    public void addSectionToCourse(Long courseId, String sectionTitle, String instructorEmail) {
        User instructor = userRepository.findByEmail(instructorEmail)
                .orElseThrow(() -> new RuntimeException("Instructor not found"));

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        if (!course.getInstructor().getId().equals(instructor.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        if (course.getSections() == null) {
            course.setSections(new ArrayList<>());
        }

        Section section = Section.builder()
                .title(sectionTitle)
                .course(course)
                .lectures(new ArrayList<>()) // ✅ Initialize lectures list
                .build();

        course.getSections().add(section);
        courseRepository.save(course);
    }

    @Override
    @Transactional
    public void addLectureToSection(Long courseId, Long sectionId, String title, MultipartFile file, String instructorEmail) {
        User instructor = userRepository.findByEmail(instructorEmail)
                .orElseThrow(() -> new RuntimeException("Instructor not found"));

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        if (!course.getInstructor().getId().equals(instructor.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        Section section = course.getSections().stream()
                .filter(s -> s.getId().equals(sectionId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Section not found"));

        if (section.getLectures() == null) {
            section.setLectures(new ArrayList<>());
        }

        String fileName = fileStorageService.store(file);

        String contentType = file.getContentType();
        String fileType = (contentType != null && contentType.toLowerCase().contains("pdf")) ? "pdf" : "video";

        Lecture lecture = Lecture.builder()
                .title(title)
                .fileType(fileType)
                .filePath(fileName)
                .section(section)
                .build();

        section.getLectures().add(lecture);
        courseRepository.save(course);
    }
    

 

 @Override
 public void enrollInCourse(Long courseId, String studentEmail) {
     User student = userRepository.findByEmail(studentEmail)
         .orElseThrow(() -> new RuntimeException("Student not found"));

     Course course = courseRepository.findById(courseId)
         .orElseThrow(() -> new RuntimeException("Course not found"));

     if (enrollmentRepository.findByStudentAndCourse(student, course).isPresent()) {
         throw new RuntimeException("Already enrolled");
     }

     StudentEnrollment enrollment = StudentEnrollment.builder()
         .student(student)
         .course(course)
         .build();

     enrollmentRepository.save(enrollment);
 }

 @Override
 public List<CourseResponseDTO> getEnrolledCourses(String studentEmail) {
     User student = userRepository.findByEmail(studentEmail)
         .orElseThrow(() -> new RuntimeException("Student not found"));

     return enrollmentRepository.findByStudent(student).stream()
         .map(enrollment -> {
             Course course = enrollment.getCourse();
             CourseResponseDTO dto = modelMapper.map(course, CourseResponseDTO.class);
             dto.setInstructorName(course.getInstructor().getName());
             return dto;
         })
         .toList();
 }

}
