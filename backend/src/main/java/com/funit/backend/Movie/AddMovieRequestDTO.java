package com.funit.backend.Movie;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.funit.backend.Genre.GenreEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Set;

/**
 * 사용자가 영화 프로젝트를 등록을 요청할때 사용하는 DTO입니다.
 */
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AddMovieRequestDTO {
    private String title;
    private String detail;
    private int targetCredit;
    private LocalDateTime endDate;

    private Set<GenreEntity> genres;

    public MovieEntity toEntity() {
        return MovieEntity.builder()
                .title(title)
                .detail(detail)
                .targetCredit(targetCredit)
                .status(1)
                .endDate(endDate)
                .genres(genres)

                .build();
    }
}
