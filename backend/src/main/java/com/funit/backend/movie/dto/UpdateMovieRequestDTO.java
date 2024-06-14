package com.funit.backend.movie.dto;

import com.funit.backend.genre.domain.Genre;
import com.funit.backend.user.domain.User;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UpdateMovieRequestDTO {
    private int id;

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

//    private MultipartFile imageFile = null;

    private String imageURL;

    private User user;

}
