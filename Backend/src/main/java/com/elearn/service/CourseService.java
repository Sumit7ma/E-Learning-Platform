package com.elearn.service;

import com.elearn.dto.CourseRequestDTO;
import com.elearn.dto.CourseResponseDTO;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public interface CourseService {
    void addCourse(CourseRequestDTO dto, String instructorEmail);
    CourseResponseDTO getCourseById(Long courseId);
    List<CourseResponseDTO> getAllCourses();
    List<CourseResponseDTO> getCoursesByInstructorEmail(String email);
    void deleteCourseByIdAndInstructor(Long id, String instructorEmail);
    void addSectionToCourse(Long courseId, String sectionTitle, String instructorEmail);
    void addLectureToSection(Long courseId, Long sectionId, String title, MultipartFile file, String instructorEmail);
    void enrollInCourse(Long courseId, String studentEmail);
    List<CourseResponseDTO> getEnrolledCourses(String studentEmail);

}
