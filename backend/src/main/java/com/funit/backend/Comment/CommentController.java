package com.funit.backend.Comment;

import com.funit.backend.response.ResponseHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/Comments")
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
}
