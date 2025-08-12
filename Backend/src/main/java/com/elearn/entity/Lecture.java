package com.elearn.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class Lecture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String fileType;  
    private String filePath;  

    @ManyToOne
    @JoinColumn(name = "section_id")
    private Section section;
}
