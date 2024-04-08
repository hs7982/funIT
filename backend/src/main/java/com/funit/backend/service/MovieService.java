package com.funit.backend.service;

import com.funit.backend.dto.AddMovieRequest;
import com.funit.backend.entity.Movie;
import com.funit.backend.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieService {
    @Autowired
    MovieRepository movieRepository;

    public List<Movie> getAllMovies() { return movieRepository.findAll(); }

    public Movie save(AddMovieRequest request) {
        return movieRepository.save(request.toEntity());
    }
}
