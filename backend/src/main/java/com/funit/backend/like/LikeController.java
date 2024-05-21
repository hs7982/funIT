package com.funit.backend.like;

import com.funit.backend.like.domain.MovieLike;
import com.funit.backend.utils.response.ResponseHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 좋아요 관련된 기능의 컨트롤러
 */
@RestController
@RequestMapping("/api/likes")
public class LikeController {
    @Autowired
    LikeService likeService;

    /**
     * 모든 좋아요 리스트를 반환합니다.
     */
    @GetMapping("   /{movieId}")
    public ResponseEntity<Object> likeOne(@PathVariable Integer movieId) {
        List<MovieLike> like = likeService.likeOne(movieId);
        return ResponseHandler.responseBuilder(
                HttpStatus.OK,
                null,
                like
        );
    }

    /**
     *
     * 해당 영화 id에 대한 좋아요 수
     *
     */
    @GetMapping("/count/{movieId}")
    public ResponseEntity<Object> getLikeCount(@PathVariable Integer movieId) {
        int count = likeService.countLike(movieId);

        return ResponseHandler.responseBuilder(
                HttpStatus.OK,
                null,
                count
        );
    }

}
