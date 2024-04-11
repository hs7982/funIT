package com.funit.backend.Genre;

import com.funit.backend.response.ResponseHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/genres")
public class GenreController {
    @Autowired
    GenreService genreService;

    @GetMapping()
    public ResponseEntity<Object> getAllGenre() {
        List<GenreEntity> genre = genreService.getAllGenres();
        return ResponseHandler.responseBuilder(
                HttpStatus.OK,
                null,
                genre
        );
    }
}

