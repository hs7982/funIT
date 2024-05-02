package com.funit.backend.like;

import com.funit.backend.like.domain.LikeRepository;
import com.funit.backend.like.domain.MovieLike;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LikeService {
    @Autowired
    LikeRepository likeRepository;

    public List<MovieLike> getAllLikes() {
        return likeRepository.findAll();
    }

    public Integer countLike(Integer movieId) {
        return likeRepository.getCount(movieId);
    }

    public List<MovieLike> likeOne(Integer movieId) { return likeRepository.findByMovieId(movieId);}
}
