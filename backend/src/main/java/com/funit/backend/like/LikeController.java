package com.funit.backend.like;

import com.funit.backend.like.domain.Like;
import com.funit.backend.response.ResponseHandler;
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
    @GetMapping()
    public ResponseEntity<Object> getAllLikes() {
        List<Like> like = likeService.getAllLikes();
        return ResponseHandler.responseBuilder(
                HttpStatus.OK,
                null,
                like
        );
    }

    @GetMapping("/count")
    public ResponseEntity<Object> getLikeCount(@RequestParam Integer movieId) {
        int count = likeService.countLike(movieId);

        return ResponseHandler.responseBuilder(
                HttpStatus.OK,
                null,
                count
        );
    }

}
