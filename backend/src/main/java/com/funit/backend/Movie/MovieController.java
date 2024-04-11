package com.funit.backend.Movie;


import com.funit.backend.response.ResponseHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 영화 프로젝트와 관련된 기능의 컨트롤러
 */
@RestController
@RequestMapping("/movies")
public class MovieController {
    @Autowired
    MovieService movieService;

    /**
     * 등록된 모든 영화 프로젝트의 리스트를 반환합니다.
     */
    @GetMapping()
    public ResponseEntity<Object> getAllMovies() {
        List<MovieEntity> movie = movieService.getAllMovies();
        return ResponseHandler.responseBuilder(
                HttpStatus.OK,
                null,
                movie
        );
    }

    /**
     * 새로운 영화 프로젝트를 등록합니다.
     */
    @PostMapping("/new")
    public ResponseEntity<Object> addMovie(@RequestBody AddMovieRequestDTO request) {
        MovieEntity savedMovie = movieService.save(request);

        return ResponseHandler.responseBuilder(
                HttpStatus.CREATED,
                "영화 프로젝트가 생성되었습니다.",
                savedMovie);
    }

    @GetMapping("/count")
    public ResponseEntity<Object> getMovieCount() {
        int count = movieService.countMovie();

        return ResponseHandler.responseBuilder(
                HttpStatus.OK,
                null,
                count
        );
    }
}
