package com.elearn.service;

import com.elearn.dto.TransactionDTO;
import com.elearn.entity.Course;
import com.elearn.entity.PaymentStatus;
import com.elearn.entity.Transaction;
import com.elearn.entity.User;
import com.elearn.repository.CourseRepository;
import com.elearn.repository.StudentEnrollmentRepository;
import com.elearn.repository.TransactionRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final CourseRepository courseRepository;
    private final StudentEnrollmentRepository enrollmentRepository;
    private final TransactionRepository transactionRepository;
    private final CourseService courseService;

    @PersistenceContext
    private EntityManager em;

    private User findUserByEmailOrThrow(String email) {
        try {
            return em.createQuery("select u from User u where u.email = :email", User.class)
                    .setParameter("email", email)
                    .getSingleResult();
        } catch (NoResultException ex) {
            throw new RuntimeException("Student not found for email: " + email);
        }
    }

    @Override
    @Transactional
    public void recordSuccessAndEnroll(Long courseId, String studentEmail) {
        User student = findUserByEmailOrThrow(studentEmail);
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found: " + courseId));

        transactionRepository.save(Transaction.builder()
                .studentId(student.getId())
                .courseId(course.getId())
                .courseTitle(course.getTitle())
                .amount((double) course.getPrice())
                .status(PaymentStatus.SUCCESS)
                .provider("STATIC_RAZORPAY")
                .build());

        boolean already = enrollmentRepository.findByStudentAndCourse(student, course).isPresent();
        if (!already) {
            courseService.enrollInCourse(courseId, studentEmail);
        }
    }

    @Override
    @Transactional
    public void recordCancel(Long courseId, String studentEmail) {
        User student = findUserByEmailOrThrow(studentEmail);
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found: " + courseId));

        transactionRepository.save(Transaction.builder()
                .studentId(student.getId())
                .courseId(course.getId())
                .courseTitle(course.getTitle())
                .amount((double) course.getPrice())
                .status(PaymentStatus.CANCELLED)
                .provider("STATIC_RAZORPAY")
                .build());
    }

    @Override
    @Transactional(readOnly = true)
    public List<TransactionDTO> history(String studentEmail) {
        User student = findUserByEmailOrThrow(studentEmail);
        return transactionRepository.findByStudentIdOrderByTimestampDesc(student.getId())
                .stream()
                .map(t -> TransactionDTO.builder()
                        .id(t.getId())
                        .courseId(t.getCourseId())
                        .courseTitle(t.getCourseTitle())
                        .amount(t.getAmount())
                        .status(t.getStatus())
                        .provider(t.getProvider())
                        .timestamp(t.getTimestamp())
                        .build())
                .toList();
    }
}
