package com.elearn.controller;

import com.elearn.dto.CourseRequestDTO;
import com.elearn.dto.CourseResponseDTO;
import com.elearn.dto.SectionDTO;
import com.elearn.service.CourseService;
import com.elearn.service.FileStorageService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/instructor/courses")
@SecurityRequirement(name = "bearerAuth")
@RequiredArgsConstructor
public class InstructorCourseController {

    private final CourseService courseService;
    private final FileStorageService fileStorageService;

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<String> addCourse(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("language") String language,
            @RequestParam("level") String level,
            @RequestParam("tag") String tag,
            @RequestParam("price") int price,
            @RequestParam("thumbnail") MultipartFile thumbnail) {

        if (title.isBlank() || description.isBlank() || language.isBlank() || level.isBlank() || tag.isBlank()) {
            return ResponseEntity.badRequest().body("All fields are required");
        }

        if (thumbnail.isEmpty()) {
            return ResponseEntity.badRequest().body("Thumbnail is required");
        }

        String email = getCurrentUserEmail();
        String storedFileName = fileStorageService.store(thumbnail);

        CourseRequestDTO dto = new CourseRequestDTO();
        dto.setTitle(title);
        dto.setDescription(description);
        dto.setLanguage(language);
        dto.setLevel(level);
        dto.setTag(tag);
        dto.setPrice(price);
        dto.setThumbnail(storedFileName);

        courseService.addCourse(dto, email);
        return ResponseEntity.status(201).body("Course added successfully");
    }

    @GetMapping
    public ResponseEntity<List<CourseResponseDTO>> getMyCourses() {
        String email = getCurrentUserEmail();
        List<CourseResponseDTO> courses = courseService.getCoursesByInstructorEmail(email);
        return ResponseEntity.ok(courses);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCourse(@PathVariable Long id) {
        String email = getCurrentUserEmail();
        courseService.deleteCourseByIdAndInstructor(id, email);
        return ResponseEntity.ok("Course deleted successfully");
    }

    @PostMapping("/{courseId}/sections")
    public ResponseEntity<String> addSection(
            @PathVariable Long courseId,
            @RequestBody SectionDTO sectionDTO
    ) {
        String email = getCurrentUserEmail();
        courseService.addSectionToCourse(courseId, sectionDTO.getTitle(), email);
        return ResponseEntity.ok("Section added successfully");
    }

    @PostMapping(
        path = "/{courseId}/sections/{sectionId}/lectures",
        consumes = "multipart/form-data"
    )
    public ResponseEntity<String> addLecture(
            @PathVariable Long courseId,
            @PathVariable Long sectionId,
            @RequestParam("title") String title,
            @RequestParam("file") MultipartFile file
    ) {
        String email = getCurrentUserEmail();
        courseService.addLectureToSection(courseId, sectionId, title, file, email);
        return ResponseEntity.ok("Lecture added successfully");
    }

    private String getCurrentUserEmail() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails userDetails) {
            return userDetails.getUsername();
        }
        throw new RuntimeException("Unauthorized");
    }
}
