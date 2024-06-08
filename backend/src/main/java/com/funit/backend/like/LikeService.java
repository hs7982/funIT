package com.funit.backend.like;

import com.funit.backend.like.domain.LikeRepository;
import com.funit.backend.like.domain.MovieLike;
import com.funit.backend.movie.domain.Movie;
import com.funit.backend.movie.domain.MovieRepository;
import com.funit.backend.user.domain.User;
import com.funit.backend.utils.mapper.LikeMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LikeService {
    @Autowired
    LikeRepository likeRepository;
    @Autowired
    MovieRepository movieRepository;

    public List<MovieLike> getAllLikes() {
        return likeRepository.findAll();
    }

    public Integer countLike(Integer movieId) {
        return likeRepository.getCount(movieId);
    }

    public List<MovieLike> likeOne(Integer movieId) {
        return likeRepository.findByMovieId(movieId);
    }

    public MovieLike likeMovie(Integer movieId, User user) {
        Movie movie = movieRepository.findById(movieId).orElseThrow(() -> new IllegalArgumentException("영화를 찾을 수 없습니다."));
        if (likeRepository.findByMovieIdAndUserId(movieId, user.getId()) != null) {
            throw new IllegalArgumentException("이미 해당 영화에 좋아요 하였습니다.");
        }
        return likeRepository.save(MovieLike.builder().movie(movie).user(user).build());
    }

    public void unlikeMovie(Integer movieId, User user) {
        MovieLike like = likeRepository.findByMovieIdAndUserId(movieId, user.getId());
        if (like == null) {
            throw new IllegalArgumentException("해당 영화에 좋아요를 표시하지 않았습니다.");
        }
        likeRepository.delete(like);
    }

    public Boolean getLikeStatus(Integer movieId, User user) {
        movieRepository.findById(movieId).orElseThrow(() -> new IllegalArgumentException("영화를 찾을 수 없습니다."));
        MovieLike like = likeRepository.findByMovieIdAndUserId(movieId, user.getId());
        return like != null;
    }

    public List<LikeDTO.MyLike> getMyLike(User user) {
        List<MovieLike> likeEntity = likeRepository.findByUserId(user.getId());
        return LikeMapper.INSTANCE.toLikeDTO(likeEntity);
    }

    ;
}
