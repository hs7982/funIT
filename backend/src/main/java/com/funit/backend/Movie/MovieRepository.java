package com.funit.backend.Movie;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MovieRepository extends JpaRepository<MovieEntity, Integer> {
    @Query("SELECT m.id FROM MovieEntity m where m.id=4")
    Integer getCount();
    //@Query("SELECT m FROM movie_entity m")


//    @Query("SELECT m.id FROM MovieEntity m where m.title like %:keyword%")
//    List<MovieEntity> findByTitleContaining(String keyword);

    List<MovieEntity> findByTitleContaining(String keyword);
}
