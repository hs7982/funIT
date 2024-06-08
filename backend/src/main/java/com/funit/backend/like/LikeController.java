package com.funit.backend.like;

import com.funit.backend.like.domain.MovieLike;
import com.funit.backend.user.domain.AuthUser;
import com.funit.backend.user.domain.User;
import com.funit.backend.utils.response.ResponseHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 좋아요 관련된 기능의 컨트롤러
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/likes")
public class LikeController {
    private final LikeService likeService;

    /**
     * 모든 좋아요 리스트를 반환합니다.
     */
    @GetMapping("/{movieId}/list")
    public ResponseEntity<Object> likeOne(@PathVariable Integer movieId) {
        List<MovieLike> like = likeService.likeOne(movieId);
        return ResponseHandler.responseBuilder(
                HttpStatus.OK,
                null,
                like
        );
    }

    /**
     * 해당 영화 id에 대한 좋아요 수
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

    /**
     * 영화에 좋아요 표시를 하는 컨트롤러
     *
     * @param movieId : url에 포함
     * @param user    : 로그인 세션에서 가져옴
     * @return
     */
    @PostMapping("/{movieId}")
    public ResponseEntity<Object> likeMovie(@PathVariable Integer movieId, @AuthUser User user) {
        MovieLike movieLike = likeService.likeMovie(movieId, user);

        return ResponseHandler.responseBuilder(
                HttpStatus.OK,
                "좋아요에 성공하였습니다.",
                movieLike
        );
    }

    /**
     * 영화에 좋아요를 취소하는 컨트롤러
     *
     * @param movieId : url에 포함
     * @param user    : 로그인 세션에서 가져옴
     * @return
     */
    @DeleteMapping("/{movieId}")
    public ResponseEntity<Object> unlikeMovie(@PathVariable Integer movieId, @AuthUser User user) {
        likeService.unlikeMovie(movieId, user);

        return ResponseHandler.responseBuilder(
                HttpStatus.OK,
                "좋아요 취소에 성공하였습니다.",
                null
        );
    }

    @GetMapping("/{movieId}")
    public ResponseEntity<Object> getLikeStatus(@PathVariable Integer movieId, @AuthUser User user) {
        Boolean like = likeService.getLikeStatus(movieId, user);

        return ResponseHandler.responseBuilder(
                HttpStatus.OK,
                null,
                like
        );
    }

    @GetMapping("/my")
    public ResponseEntity<Object> getMyLike(@AuthUser User user) {
        List<LikeDTO.MyLike> like = likeService.getMyLike(user);

        return ResponseHandler.responseBuilder(
                HttpStatus.OK,
                null,
                like
        );
    }

}
