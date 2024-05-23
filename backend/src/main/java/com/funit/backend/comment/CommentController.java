package com.funit.backend.comment;

import com.funit.backend.comment.domain.Comment;
import com.funit.backend.utils.response.ResponseHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {
    @Autowired
    CommentService commentService;

    /**
     *  해당 영화에 대한 댓글 표시
     */
    @GetMapping("/count/{movieId}")
    public ResponseEntity<Object> getMovieComment(@PathVariable Integer movieId) {
        List<Comment> comment = commentService.getMovieComments(movieId);
        return ResponseHandler.responseBuilder(
                HttpStatus.OK,
                null,
                comment
        );
    }
    /**
     *  댓글생성 //user id 안들어감수정해야함
     */
    @PostMapping("/new")
    public ResponseEntity<Object> addComment(@RequestBody CommentDTO request) {
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
    public ResponseEntity<Void> deleteComment(@PathVariable int id) {
        commentService.commentDelete(id);
        return ResponseEntity.ok()
                .build();
    }
}
