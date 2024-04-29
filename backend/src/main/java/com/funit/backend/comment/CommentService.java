package com.funit.backend.comment;

import com.funit.backend.comment.domain.Comment;
import com.funit.backend.comment.domain.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {
    @Autowired
    CommentRepository commentRepository;

    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    public Comment save(CommentDTO request) {
        return commentRepository.save(request.toEntity());
    }

    public void commentDelete(int id) {
        commentRepository.deleteById(id);
    }
}
