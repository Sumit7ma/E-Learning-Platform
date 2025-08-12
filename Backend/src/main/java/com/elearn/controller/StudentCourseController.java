package com.elearn.controller;

import com.elearn.dto.CourseResponseDTO;
import com.elearn.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student")
@RequiredArgsConstructor
public class StudentCourseController {

    private final CourseService courseService;

    @PostMapping("/enroll/{courseId}")
    public ResponseEntity<String> enrollInCourse(
            @PathVariable Long courseId,
            @AuthenticationPrincipal UserDetails userDetails) {
        courseService.enrollInCourse(courseId, userDetails.getUsername());
        return ResponseEntity.ok("Enrolled successfully");
    }

    @GetMapping("/enrollments")
    public ResponseEntity<List<CourseResponseDTO>> getMyEnrollments(
            @AuthenticationPrincipal UserDetails userDetails) {
        List<CourseResponseDTO> courses = courseService.getEnrolledCourses(userDetails.getUsername());
        return ResponseEntity.ok(courses);
    }
}
