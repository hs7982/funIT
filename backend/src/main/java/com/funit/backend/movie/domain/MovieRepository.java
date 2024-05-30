package com.funit.backend.movie.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MovieRepository extends JpaRepository<Movie, Integer> {
    @Query("SELECT m.id FROM Movie m where m.id=4")
    Integer getCount();

    List<Movie> findByTitleContaining(String keyword);
}
