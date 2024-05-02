package com.funit.backend.like.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface LikeRepository extends JpaRepository<MovieLike, Integer> {

    @Query(value = "select count(*) from MovieLike l where l.movie.id = :movieId")
    Integer getCount(Integer movieId);

    List<MovieLike> findByMovieId(Integer movieId);
}
