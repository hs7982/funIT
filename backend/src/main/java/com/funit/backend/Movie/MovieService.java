package com.funit.backend.Movie;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieService {
    @Autowired
    MovieRepository movieRepository;

    public List<MovieEntity> getAllMovies() { return movieRepository.findAll(); }

    public MovieEntity save(AddMovieRequestDTO request) {
        return movieRepository.save(request.toEntity());
    }

    public MovieEntity findOne(int movie_id) { return movieRepository.findById(movie_id).orElse(null);}

}
