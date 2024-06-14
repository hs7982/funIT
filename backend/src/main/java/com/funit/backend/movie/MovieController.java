package com.funit.backend.movie;


import com.funit.backend.movie.domain.Movie;
import com.funit.backend.movie.dto.AddMovieRequestDTO;
import com.funit.backend.movie.dto.MovieDTO;
import com.funit.backend.movie.dto.MovieListDTO;
import com.funit.backend.movie.dto.UpdateMovieRequestDTO;
import com.funit.backend.user.domain.AuthUser;
import com.funit.backend.user.domain.User;
import com.funit.backend.utils.response.ResponseHandler;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * 영화 프로젝트와 관련된 기능의 컨트롤러
 */
@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/movies")
public class MovieController {
    private final MovieService movieService;

    /**
     * 등록된 진행중 영화 프로젝트의 리스트를 반환합니다.
     */
    @GetMapping()
    public ResponseEntity<Object> getAllMovies() {
        List<MovieListDTO> movie = movieService.getAllMovies();
        return ResponseHandler.responseBuilder(
                HttpStatus.OK,
                null,
                movie
        );
    }

    /**
     * 등록된 종료된 영화 프로젝트의 리스트를 반환합니다.
     */
    @GetMapping("/end")
    public ResponseEntity<Object> getAllMoviesEnd() {
        List<MovieListDTO> movie = movieService.getAllMoviesEnd();
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
    public ResponseEntity<Object> addMovie(@AuthUser User user, @Valid @ModelAttribute AddMovieRequestDTO request) {
        request.setUser(user);
        MultipartFile imageFile = request.getImageFile();
        Movie savedMovie = movieService.save(request, imageFile);

        return ResponseHandler.responseBuilder(
                HttpStatus.CREATED,
                "영화 프로젝트가 생성되었습니다.",
                savedMovie);
    }

    @GetMapping("/{movie_id}")
    public ResponseEntity<Object> findOne(@PathVariable int movie_id) {
        MovieDTO findOne = movieService.findOne(movie_id);

        if (findOne == null) return ResponseHandler.responseBuilder(
                HttpStatus.NO_CONTENT,
                null,
                null
        );

        return ResponseHandler.responseBuilder(
                HttpStatus.OK,
                null,
                findOne);
    }

    @DeleteMapping("/{movieId}")
    public ResponseEntity<Object> deleteMovie(@AuthUser User user, @PathVariable int movieId) {
        movieService.delete(user, movieId);
        return ResponseHandler.responseBuilder(
                HttpStatus.OK,
                movieId + "가 삭제되었습니다.",
                null
        );
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
        List<MovieListDTO> moviesearchList = movieService.search(keyword);
        return ResponseHandler.responseBuilder(
                HttpStatus.OK,
                null,
                moviesearchList
        );
    }

    /**
     * 영화 수정
     */
    @PutMapping("/{movieId}")
    public ResponseEntity<Object> updateMovie(
            @AuthUser User user,
            @Valid @ModelAttribute UpdateMovieRequestDTO request,
            @RequestBody(required = false) MultipartFile imageFile,
            @PathVariable int movieId) {
        request.setUser(user);

        Movie savedMovie = movieService.updateMovieDetails(user, movieId, request, imageFile);

        return ResponseHandler.responseBuilder(
                HttpStatus.OK,
                "영화 프로젝트가 수정되었습니다.",
                savedMovie);
    }
}
