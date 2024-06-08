package com.funit.backend.movie.dto;

import com.funit.backend.genre.domain.Genre;
import com.funit.backend.production.domain.Production;
import com.funit.backend.user.domain.User;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MovieDTO {
    private int id;
    private String title;
    private User user;
    private String detail;
    private long targetCredit;
    private int status;
    private String thumbnailImage;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;
    private LocalDateTime endDate;
    private List<Genre> genres;
    private List<Production> productions;
    private int totalFunding;
    private int likeCount;
}
