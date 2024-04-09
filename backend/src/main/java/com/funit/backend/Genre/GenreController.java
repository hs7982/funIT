package com.funit.backend.Genre;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class GenreController {
    @Autowired
    GenreService genreService;

    @GetMapping("/genres")
    public List<GenreEntity> getAllGenres() {
        List<GenreEntity> genre = genreService.getAllGenres();
        return genre;
    }
}

