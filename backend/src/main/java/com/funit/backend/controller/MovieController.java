package com.funit.backend.controller;

import com.funit.backend.dto.AddMovieRequest;
import com.funit.backend.entity.Movie;
import com.funit.backend.response.ResponseHandler;
import com.funit.backend.service.MovieService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/movies")
public class MovieController {
    @Autowired
    MovieService movieService;

    @GetMapping("/list")
    public List<Movie> getAllMovies() {
        List<Movie> movie = movieService.getAllMovies();
        return movie;
    }

    @PostMapping("/new")
    public ResponseEntity<Object> addMovie(@RequestBody AddMovieRequest request) {
        Movie savedMovie = movieService.save(request);

        return (savedMovie != null) ?
                ResponseHandler.responseBuilder(
                    HttpStatus.CREATED,
                    "영화 프로젝트가 생성되었습니다.",
                    savedMovie) :
                ResponseHandler.responseBuilder(
                        HttpStatus.BAD_REQUEST,
                        "잘못된 요청입니다.",
                        null
                );
    }
}
