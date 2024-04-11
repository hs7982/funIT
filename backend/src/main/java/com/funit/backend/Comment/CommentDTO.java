package com.funit.backend.Comment;

import com.funit.backend.Movie.MovieEntity;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentDTO {
    private String content;
    private MovieEntity movieId;
    public CommentEntity toEntity(){
        return CommentEntity.builder()
                .content(content)
                .movie(movieId)

                .build();
    }
}
