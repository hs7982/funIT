package com.funit.backend.dto;

import com.funit.backend.entity.Genre;
import com.funit.backend.entity.Movie;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class AddMovieRequest {
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
