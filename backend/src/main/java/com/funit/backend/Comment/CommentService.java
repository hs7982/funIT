package com.funit.backend.Comment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {
    @Autowired
    CommentRepository commentRepository;
    public List<CommentEntity> getAllComments() { return commentRepository.findAll(); }
}
