package com.funit.backend.movie;


import com.funit.backend.comment.CommentDTO;
import com.funit.backend.movie.domain.Movie;
import com.funit.backend.response.ResponseHandler;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 영화 프로젝트와 관련된 기능의 컨트롤러
 */
@RestController
@RequestMapping("/api/movies")
public class MovieController {
    @Autowired
    MovieService movieService;

    /**
     * 등록된 모든 영화 프로젝트의 리스트를 반환합니다.
     */
    @GetMapping()
    public ResponseEntity<Object> getAllMovies() {
        List<Movie> movie = movieService.getAllMovies();
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
    //@PreAuthorize("")
    public ResponseEntity<Object> addMovie(@Valid @ModelAttribute AddMovieRequestDTO request) {
        Movie savedMovie = movieService.save(request);

        return ResponseHandler.responseBuilder(
                HttpStatus.CREATED,
                "영화 프로젝트가 생성되었습니다.",
                savedMovie);
    }

    @GetMapping("/{movie_id}")
    public ResponseEntity<Object> findOne(@PathVariable int movie_id) {
        Movie findOne = movieService.findOne(movie_id);

        return ResponseHandler.responseBuilder(
                HttpStatus.OK,
                null,
                findOne);
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

    /**
     * 제목 검색
     */
    @GetMapping("/search")
    public ResponseEntity<Object> search(@RequestParam String keyword) {
        List<Movie> moviesearchList = movieService.search(keyword);
        return ResponseHandler.responseBuilder(
                HttpStatus.OK,
                null,
                moviesearchList
        );
    }

}
