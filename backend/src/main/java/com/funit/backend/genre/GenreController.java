package com.funit.backend.genre;

import com.funit.backend.genre.domain.Genre;
import com.funit.backend.utils.response.ResponseHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/genres")
public class GenreController {
    private final GenreService genreService;

    @GetMapping()
    public ResponseEntity<Object> getAllGenre() {
        List<Genre> genre = genreService.getAllGenres();
        return ResponseHandler.responseBuilder(
                HttpStatus.OK,
                null,
                genre
        );
    }
}

