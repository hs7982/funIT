package com.funit.backend.Movie;

import com.funit.backend.Genre.GenreEntity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
    @NotBlank(message = "제목은 필수값입니다.")
    private String title;

    @NotBlank(message = "상세 내용은 필수값입니다.")
    private String detail;

    @NotNull(message = "목표 금액은 필수값입니다.")
    private int targetCredit;

    @NotNull
    private LocalDateTime endDate;

    @NotNull
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
