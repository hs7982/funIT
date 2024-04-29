package com.funit.backend.like;

import com.funit.backend.like.domain.Like;
import com.funit.backend.like.domain.LikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LikeService {
    @Autowired
    LikeRepository likeRepository;

    public List<Like> getAllLikes() {
        return likeRepository.findAll();
    }

    public Integer countLike(Integer movieId) {
        return likeRepository.getCount(movieId);
    }
}
