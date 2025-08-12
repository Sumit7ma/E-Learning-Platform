package com.elearn.repository;

import com.elearn.entity.Course;
import com.elearn.entity.StudentEnrollment;
import com.elearn.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StudentEnrollmentRepository extends JpaRepository<StudentEnrollment, Long> {
    Optional<StudentEnrollment> findByStudentAndCourse(User student, Course course);
    List<StudentEnrollment> findByStudent(User student);
}
