package com.funit.backend.movie;

import com.funit.backend.funding.FundingDTO;
import com.funit.backend.funding.FundingService;
import com.funit.backend.movie.domain.Movie;
import com.funit.backend.movie.domain.MovieRepository;
import com.funit.backend.movie.dto.AddMovieRequestDTO;
import com.funit.backend.movie.dto.MovieDTO;
import com.funit.backend.movie.dto.MovieListDTO;
import com.funit.backend.s3.ImageService;
import com.funit.backend.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;
@EnableScheduling
@Service
@RequiredArgsConstructor
public class MovieService {
    private final MovieRepository movieRepository;
    private final ImageService imageService;
    private final FundingService fundingService;

    public List<MovieListDTO> getAllMovies() {
        List<Movie> movies = movieRepository.findAll();
        return movies.stream()
                .filter(movie -> movie.getStatus() == 1) // 상태가 1인 경우만 필터링
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

    /**
     * 마감된 영화 출력
     */
    public List<MovieListDTO> getAllMoviesEnd() {
        List<Movie> movies = movieRepository.findAll();
        return movies.stream()
                .filter(movie -> movie.getStatus() == 2) // 상태가 2인 경우만 필터링
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

    // 1분 마다 실행되도록 스케줄링
    @Scheduled(cron = "0 * * * * *")
    public void updateMoviesStatusPeriodically() {
        System.out.println("스케쥴링");
        updateMoviesStatus();
    }
    // 마감 시간이 지난 영화의 상태를 변경하는 메서드
    public void updateMoviesStatus() {
        LocalDateTime currentTime = LocalDateTime.now();
        List<Movie> movies = movieRepository.findAll();

        for (Movie movie : movies) {
            LocalDateTime endTime = movie.getEndDate();
            if (endTime.isBefore(currentTime) && movie.getStatus() != 2) {
                // 영화의 상태를 변경
                //movie.setStatus(2); // 2는 마감 상태를 나타냄
                movieRepository.updateMovieStatus(movie.getId(), 2);
            }
        }
    }

    public Movie save(AddMovieRequestDTO request, MultipartFile imageFile) {
        String imgUrl = imageService.saveImage(imageFile, "movieThumbnailImage");
        request.setImageURL(imgUrl);
        return movieRepository.save(request.toEntity());
    }

    public void delete(User user, int movieId) {
        Movie movie = movieRepository.findById(movieId).orElseThrow(() -> new NoSuchElementException("해당 영화를 찾을 수 없습니다."));
        if (!user.getRole().equals("admin") && movie.getUser().getId() != user.getId()) {
            throw new AccessDeniedException("삭제할 권한이 없습니다!");
        }
        movieRepository.deleteById(movieId);
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
