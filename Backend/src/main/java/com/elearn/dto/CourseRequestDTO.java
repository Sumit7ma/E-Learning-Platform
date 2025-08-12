package com.elearn.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CourseRequestDTO {
    private String title;
    private String description;
    private String thumbnail;
    private String tag;
    private String language;
    private int price;
    private String level;
}
