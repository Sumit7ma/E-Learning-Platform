package com.elearn.dto;

import lombok.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseResponseDTO {
    private Long id;
    private String title;
    private String description;
    private String thumbnail;
    private String tag;
    private String language;
    private int price;
    private String instructorName;
    private String level;
    private List<SectionDTO> sections;
}
