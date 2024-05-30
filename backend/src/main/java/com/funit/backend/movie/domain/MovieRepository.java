package com.funit.backend.movie.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface MovieRepository extends JpaRepository<Movie, Integer> {
    @Query("SELECT m.id FROM Movie m where m.id=4")
    Integer getCount();
    
    List<Movie> findByTitleContaining(String keyword);

    @Query(value = "SELECT f.endDate FROM Movie f WHERE f.id = :movieId")
    LocalDateTime getEndTimeByMovieId(@Param("movieId") Integer movieId);
}
