package com.funit.backend.comment;

import com.funit.backend.comment.domain.Comment;
import com.funit.backend.comment.domain.CommentRepository;
import com.funit.backend.user.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class CommentService {
    @Autowired
    CommentRepository commentRepository;

    public List<Comment> getMovieComments(int movieId) {
        return commentRepository.findByMovieId(movieId);
    }

    public Comment save(CommentDTO request) {
        return commentRepository.save(request.toEntity());
    }

    public void commentDelete(int id, User user) {
        Comment comment = commentRepository.findById(id).orElseThrow(() -> new NoSuchElementException("해당 댓글을 찾을 수 없습니다."));
        if (!user.getRole().equals("admin") && comment.getUser().getId() != user.getId()) {
            throw new AccessDeniedException("삭제할 권한이 없습니다!");
        }
        commentRepository.deleteById(id);
    }

    public Integer getcountComment(Integer movieId) {
        return commentRepository.getCount(movieId);
    }
}
