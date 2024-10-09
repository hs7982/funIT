package com.funit.backend.movie;

import com.funit.backend.movie.domain.Movie;
import com.funit.backend.movie.domain.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Objects;

// 순환 참조로 인한 클래스 분리
@Service
@RequiredArgsConstructor
public class FindMovie {
    private final MovieRepository movieRepository;

    public Movie findById(int movieId) {
        Movie movie = movieRepository.findById(movieId).orElse(null);

        if (movie != null) {
            if (Objects.requireNonNull(movie).getStatus() == 3) {
                movie = null;
            }
        }

        return movie;
    }
}
