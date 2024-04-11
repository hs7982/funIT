package com.funit.backend.Like;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LikeDTO {
    private Integer like_id;
    private Integer user_id;
    private Integer movie_id;

    public LikeEntity toEntity() {
        return LikeEntity.builder()
                .id(like_id)
                .id(user_id)
                .id(movie_id)

                .build();
    }
}
