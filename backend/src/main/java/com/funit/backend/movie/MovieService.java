package com.funit.backend.movie;

import com.funit.backend.movie.domain.Movie;
import com.funit.backend.movie.domain.MovieRepository;
import com.funit.backend.s3.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class MovieService {
    @Autowired
    MovieRepository movieRepository;
    @Autowired
    ImageService imageService;

    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    public Movie save(AddMovieRequestDTO request, MultipartFile imageFile) {
        String imgUrl = imageService.saveImage(imageFile);
        request.setImageURL(imgUrl);
        return movieRepository.save(request.toEntity());
    }

    public Integer countMovie() {
        return movieRepository.getCount();
    }

    public Movie findOne(int movie_id) {
        return movieRepository.findById(movie_id).orElse(null);
    }


    public List<Movie> search(String keyword) {
        return movieRepository.findByTitleContaining(keyword);
    }


}
