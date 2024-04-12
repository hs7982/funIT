package com.funit.backend.Comment;

import com.funit.backend.response.ResponseHandler;
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

    @GetMapping()
    public ResponseEntity<Object> getAllComment() {
        List<CommentEntity> comment = commentService.getAllComments();
        return ResponseHandler.responseBuilder(
                HttpStatus.OK,
                null,
                comment
        );
    }

    @PostMapping("/new")
    public ResponseEntity<Object> addComment(@RequestBody CommentDTO request) {
        CommentEntity savedComment = commentService.save(request);

        return ResponseHandler.responseBuilder(
                HttpStatus.CREATED,
                "댓글이 생성되었습니다.",
                savedComment);

    }
}
