package com.funit.backend.controller;

import com.funit.backend.entity.Genre;
import com.funit.backend.service.GenreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class GenreController {
    @Autowired
    GenreService genreService;

    @GetMapping("/genres")
    public List<Genre> getAllGenres() {
        List<Genre> genre = genreService.getAllGenres();
        return genre;
    }
}

