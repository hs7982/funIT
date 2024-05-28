package com.funit.backend.comment;

import com.funit.backend.comment.domain.Comment;
import com.funit.backend.user.domain.AuthUser;
import com.funit.backend.user.domain.User;
import com.funit.backend.utils.response.ResponseHandler;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comments")
public class CommentController {
    private final CommentService commentService;

    /**
     * 해당 영화에 대한 댓글 표시
     */
    @GetMapping("/{movieId}")
    public ResponseEntity<Object> getMovieComment(@PathVariable Integer movieId) {
        List<Comment> comment = commentService.getMovieComments(movieId);
        return ResponseHandler.responseBuilder(
                HttpStatus.OK,
                null,
                comment
        );
    }

    /**
     * 댓글생성
     */
    @PostMapping()
    public ResponseEntity<Object> addComment(@AuthUser User user, @Valid @RequestBody CommentDTO request) {
        request.setUser(user);
        Comment savedComment = commentService.save(request);

        return ResponseHandler.responseBuilder(
                HttpStatus.CREATED,
                "댓글이 생성되었습니다.",
                savedComment);
    }

    /**
     * 댓글 삭제
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteComment(@AuthUser User user, @PathVariable int id) {
        commentService.commentDelete(id, user);
        return ResponseHandler.responseBuilder(
                HttpStatus.OK,
                "댓글 삭제되었습니다.",
                null);
    }

    /**
     * 해당 영화에 대한 총 댓글 수
     */
    @GetMapping("/{movieId}/commentcount")
    public ResponseEntity<Object> getCommentCount(@PathVariable Integer movieId) {
        int count = commentService.getcountComment(movieId);
        return ResponseHandler.responseBuilder(
                HttpStatus.OK,
                null,
                count
        );
    }
}
