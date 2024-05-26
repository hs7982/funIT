package com.funit.backend.comment;

import com.funit.backend.comment.domain.Comment;
import com.funit.backend.movie.domain.Movie;
import com.funit.backend.user.domain.User;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentDTO {
    @NotNull(message = "내용은 필수입니다.")
    private String content;
    @NotNull(message = "댓글 대상 영화 ID를 지정해야 합니다.")
    private Movie movie;
    private User user;

    public Comment toEntity() {
        return Comment.builder()
                .content(content)
                .movie(movie)
                .user(user)

                .build();
    }
}
