package com.funit.backend.movie;

import com.funit.backend.funding.FundingDTO;
import com.funit.backend.funding.FundingService;
import com.funit.backend.movie.domain.Movie;
import com.funit.backend.movie.domain.MovieRepository;
import com.funit.backend.movie.dto.AddMovieRequestDTO;
import com.funit.backend.movie.dto.MovieDTO;
import com.funit.backend.movie.dto.MovieListDTO;
import com.funit.backend.s3.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MovieService {
    private final MovieRepository movieRepository;
    private final ImageService imageService;
    private final FundingService fundingService;

    public List<MovieListDTO> getAllMovies() {
        List<Movie> movies = movieRepository.findAll();
        return movies.stream()
                .map(movie -> {
                    FundingDTO fundingDTO = fundingService.getTotalFundingByMoiveId(movie.getId());
                    return MovieListDTO.builder()
                            .id(movie.getId())
                            .title(movie.getTitle())
                            .targetCredit(movie.getTargetCredit())
                            .status(movie.getStatus())
                            .thumbnailImage(movie.getThumbnailImage())
                            .createDate(movie.getCreateDate())
                            .endDate(movie.getEndDate())
                            .genres(movie.getGenres())
                            .totalFunding(fundingDTO.getFundingTotalAmount()) // 펀딩 금액 설정
                            .build();
                })
                .collect(Collectors.toList());
    }

    public Movie save(AddMovieRequestDTO request, MultipartFile imageFile) {
        String imgUrl = imageService.saveImage(imageFile, "movieThumbnailImage");
        request.setImageURL(imgUrl);
        return movieRepository.save(request.toEntity());
    }

    public Integer countMovie() {
        return movieRepository.getCount();
    }

    public MovieDTO findOne(int movieId) {
        Movie movie = movieRepository.findById(movieId).orElse(null);
        if (movie == null) {
            return null;
        }
        FundingDTO totalFunding = fundingService.getTotalFundingByMoiveId(movieId);
        return MovieDTO.builder()
                .id(movie.getId())
                .title(movie.getTitle())
                .user(movie.getUser())
                .detail(movie.getDetail())
                .targetCredit(movie.getTargetCredit())
                .status(movie.getStatus())
                .thumbnailImage(movie.getThumbnailImage())
                .createDate(movie.getCreateDate())
                .updateDate(movie.getUpdateDate())
                .endDate(movie.getEndDate())
                .genres(movie.getGenres())
                .productions(movie.getProductions())
                .totalFunding(totalFunding.getFundingTotalAmount()) // 펀딩 금액 설정
                .build();
    }

    public List<Movie> search(String keyword) {
        return movieRepository.findByTitleContaining(keyword);
    }


}
