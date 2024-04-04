package com.funit.backend.controller;

import com.funit.backend.entity.Movie;
import com.funit.backend.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MovieController {
    @Autowired
    MovieService movieService;

    @GetMapping("/movies")
    public List<Movie> getAllMovies() {
        List<Movie> movie = movieService.getAllMovies();
        return movie;
    }
}
