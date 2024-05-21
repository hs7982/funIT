package com.funit.backend.movie.dto;

import com.funit.backend.genre.domain.Genre;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MovieListDTO {
    private int id;
    private String title;
    private long targetCredit;
    private int totalFunding;
    private int status;
    private String thumbnailImage;
    private LocalDateTime createDate;
    private LocalDateTime endDate;
    private List<Genre> genres;
}