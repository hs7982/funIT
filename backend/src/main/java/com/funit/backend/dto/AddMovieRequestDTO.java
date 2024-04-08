package com.funit.backend.dto;

import com.funit.backend.entity.Genre;
import com.funit.backend.entity.Movie;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;

/**
 * 사용자가 영화 프로젝트를 등록을 요청할때 사용하는 DTO입니다.
* */
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class AddMovieRequestDTO {
    private String title;
    private String detail;

    private int targetCredit;
    private LocalDateTime endDate;

    private Set<Genre> genres;

    public Movie toEntity() {
            return Movie.builder()
                    .title(title)
                    .detail(detail)
                    .targetCredit(targetCredit)
                    .endDate(endDate)
                    .genres(genres)

                    .build();
    }
}
