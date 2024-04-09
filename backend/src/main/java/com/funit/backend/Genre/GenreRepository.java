package com.funit.backend.Genre;

import com.funit.backend.Genre.GenreEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenreRepository extends JpaRepository<GenreEntity, Integer> {
}
