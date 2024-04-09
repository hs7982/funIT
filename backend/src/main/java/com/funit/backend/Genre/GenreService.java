package com.funit.backend.Genre;

import com.funit.backend.Genre.GenreEntity;
import com.funit.backend.Genre.GenreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GenreService {
    @Autowired
    GenreRepository genreRepository;
    public List<GenreEntity> getAllGenres() { return genreRepository.findAll(); }
}
