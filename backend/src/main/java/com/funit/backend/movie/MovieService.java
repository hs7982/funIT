package com.funit.backend.movie;

import com.funit.backend.funding.FundingDTO;
import com.funit.backend.funding.FundingService;
import com.funit.backend.funding.domain.Funding;
import com.funit.backend.like.LikeService;
import com.funit.backend.movie.domain.Movie;
import com.funit.backend.movie.domain.MovieRepository;
import com.funit.backend.movie.dto.AddMovieRequestDTO;
import com.funit.backend.movie.dto.MovieDTO;
import com.funit.backend.movie.dto.MovieListDTO;
import com.funit.backend.movie.dto.UpdateMovieRequestDTO;
import com.funit.backend.s3.ImageService;
import com.funit.backend.user.domain.User;
import com.funit.backend.utils.mapper.MovieMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.EnableScheduling;
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
    private final LikeService likeService;
    private final FindMovie findMovie;

    public List<MovieListDTO> getAllMovies() {
        List<Movie> movies = movieRepository.findAll();
        return movies.stream()
                .filter(movie -> movie.getStatus() == 1) // 상태가 1인 경우만 필터링
                .map(movie -> {
                    int totalFunding = fundingService.getTotalFundingByMoiveId(movie.getId()).getFundingTotalAmount();
                    return MovieMapper.INSTANCE.toMovieListDTO(movie, totalFunding);
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
                    int totalFunding = fundingService.getTotalFundingByMoiveId(movie.getId()).getFundingTotalAmount();
                    return MovieMapper.INSTANCE.toMovieListDTO(movie, totalFunding);
                })
                .collect(Collectors.toList());
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
        if (movie.getStatus() == 3) {
            throw new IllegalArgumentException("이미 삭제처리된 프로젝트입니다.");
        }
        List<Funding> fundingList = fundingService.getFundingByMovieId(movieId);
        if (!fundingList.isEmpty()) {
            fundingList.forEach(funding -> {
                fundingService.refundFunding(funding, "프로젝트 삭제요청으로 자동환불처리");
            });
        }

        //연관 관계 정리
        movie.getGenres().clear();
        movie.getProductions().clear();
        movieRepository.save(movie);

        //후 삭제
//        movieRepository.deleteById(movieId);
        movieRepository.disableByMovieId(movieId);
    }

    public Integer countMovie() {
        return movieRepository.getCount();
    }


    public MovieDTO findOne(int movieId) {
        Movie movie = findMovie.findById(movieId);

        if (movie == null) {
            return null;
        }

        int likeCount = likeService.countLike(movieId);
        int fundingCount = fundingService.countFunding(movieId);
        FundingDTO totalFunding = fundingService.getTotalFundingByMoiveId(movieId);
        return MovieMapper.INSTANCE.toMovieDTO(movie, totalFunding.getFundingTotalAmount(), fundingCount, likeCount);
    }

    public List<MovieListDTO> search(String keyword) {
        List<Movie> movies = movieRepository.findByTitleContaining(keyword);
        return movies.stream().filter(movie -> movie.getStatus() != 3).map(movie -> {
            int amount = fundingService.getTotalFundingByMoiveId(movie.getId()).getFundingTotalAmount();
            return MovieMapper.INSTANCE.toMovieListDTO(movie, amount); // Movie와 펀딩 금액을 사용해 MovieListDTO 객체 생성
        }).collect(Collectors.toList());
    }


    /**
     * 영화 수정
     */
    public Movie updateMovieDetails(User user, int movieId, UpdateMovieRequestDTO request, MultipartFile imageFile) {
        // 영화 ID로 기존의 영화 정보를 가져옵니다.
        Movie existingMovie = findMovie.findById(movieId);
        if (existingMovie == null) {
            throw new IllegalArgumentException("해당 영화를 찾을 수 없습니다.");
        }
        // 사용자가 영화를 수정할 권한을 가지고 있는지 확인할 수 있는 코드를 여기에 추가할 수 있습니다.
        if (!user.getRole().equals("admin") && existingMovie.getUser().getId() != user.getId()) {
            throw new AccessDeniedException("수정할 권한이 없습니다!");
        }

        // 새로운 이미지를 저장하고 이미지 URL을 업데이트합니다.
        if (imageFile != null) {
            String imageUrl = imageService.saveImage(imageFile, "movieThumbnailImage");
            request.setImageURL(imageUrl);
        }
        // 상세내용 오류있음
        existingMovie.setDetail(request.getDetail());

        // 요청에 포함된 정보로 기존의 영화 정보를 업데이트합니다.
        existingMovie.setTitle(request.getTitle());
        existingMovie.setTargetCredit(request.getTargetCredit());
        existingMovie.setEndDate(request.getEndDate());

        //날짜 변경에 따른 상태 변경
        if (existingMovie.getStatus() == 2 && request.getEndDate().isAfter(LocalDateTime.now()))
            existingMovie.setStatus(1);

        existingMovie.setGenres(request.getGenres());
        if (request.getImageURL() != null) existingMovie.setThumbnailImage(request.getImageURL());

        // 업데이트된 영화 정보를 저장하고 반환합니다.
        return movieRepository.save(existingMovie);
    }

    public List<MovieListDTO> getMyMovie(User user) {
        List<Movie> movies;
        if (user.getRole().equals("admin")) {
            movies = movieRepository.findAll(); //관리자는 모든 항목 표시
        } else {
            movies = movieRepository.findByUserId(user.getId());
        }

        return movies.stream()
                .filter(movie -> movie.getStatus() != 3) // 상태가 2인 경우만 필터링
                .map(movie -> {
                    int totalFunding = fundingService.getTotalFundingByMoiveId(movie.getId()).getFundingTotalAmount();
                    return MovieMapper.INSTANCE.toMovieListDTO(movie, totalFunding);
                })
                .collect(Collectors.toList());
    }

}
