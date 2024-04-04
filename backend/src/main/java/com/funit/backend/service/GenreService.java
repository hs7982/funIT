package com.funit.backend.service;

import com.funit.backend.entity.Genre;
import com.funit.backend.repository.GenreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GenreService {
    @Autowired
    GenreRepository genreRepository;
    public List<Genre> getAllGenres() { return genreRepository.findAll(); }
}
