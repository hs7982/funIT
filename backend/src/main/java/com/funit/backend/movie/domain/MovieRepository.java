package com.funit.backend.movie.domain;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface MovieRepository extends JpaRepository<Movie, Integer> {
    @Query("SELECT m.id FROM Movie m where m.id=4")
    Integer getCount();

    List<Movie> findByTitleContaining(String keyword);

    Movie getById(int id);

    @Query(value = "SELECT f.endDate FROM Movie f WHERE f.id = :movieId")
    LocalDateTime getEndTimeByMovieId(@Param("movieId") Integer movieId);

    @Modifying
    @Transactional
    @Query("update Movie m set m.status = 3 where m.id=:id")
    void disableByMovieId(@Param(value = "id") Integer movieId);

    List<Movie> findByUserId(Integer userId);

//    @Query(value = "UPDATE Movie m SET m.id = :movieId WHERE ")
//    List<Movie> chanMo(@Param("movieId") Integer movieId);
}
