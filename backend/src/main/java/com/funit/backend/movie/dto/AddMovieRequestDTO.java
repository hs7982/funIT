package com.funit.backend.movie.dto;

import com.funit.backend.genre.domain.Genre;
import com.funit.backend.movie.domain.Movie;
import com.funit.backend.user.domain.User;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

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
    @Min(value = 1, message = "최소 금액은 1원 이상입니다.")
    private long targetCredit;

    @NotNull(message = "종료일은 필수값입니다.")
    private LocalDateTime endDate;

    @NotEmpty(message = "장르를 지정해야합니다.")
    private List<Genre> genres;

    private MultipartFile imageFile;

    private String imageURL;

    private User user;

    public Movie toEntity() {
        return Movie.builder()
                .title(title)
                .detail(detail)
                .targetCredit(targetCredit)
                .status(1)
                .endDate(endDate)
                .genres(genres)
                .thumbnailImage(imageURL)
                .user(user)

                .build();
    }
}
