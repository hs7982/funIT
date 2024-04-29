package com.funit.backend.comment;

import com.funit.backend.comment.domain.Comment;
import com.funit.backend.movie.domain.Movie;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentDTO {
    private String content;
    private Movie movieId;

    public Comment toEntity() {
        return Comment.builder()
                .content(content)
                .movie(movieId)

                .build();
    }
}
