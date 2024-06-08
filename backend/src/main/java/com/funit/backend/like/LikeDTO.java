package com.funit.backend.like;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

public class LikeDTO {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class MyLike {
        private int id;
        private int movieId;
        private String movieTitle;
    }
}
