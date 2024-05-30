package com.funit.backend.movie.domain;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MovieRepository extends JpaRepository<Movie, Integer> {
    @Query("SELECT m.id FROM Movie m where m.id=4")
    Integer getCount();
    //@Query("SELECT m FROM movie_entity m")

//    @Query("SELECT m.id FROM MovieEntity m where m.title like %:keyword%")
//    List<MovieEntity> findByTitleContaining(String keyword);

    @Modifying
    @Transactional
    @Query("UPDATE Movie m SET m.status = :status WHERE m.id = :movieId")
    void updateMovieStatus(@Param("movieId") int movieId, @Param("status") int status);

    List<Movie> findByTitleContaining(String keyword);
}
