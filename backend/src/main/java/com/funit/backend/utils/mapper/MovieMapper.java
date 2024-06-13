package com.funit.backend.utils.mapper;

import com.funit.backend.movie.domain.Movie;
import com.funit.backend.movie.dto.MovieDTO;
import com.funit.backend.movie.dto.MovieListDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface MovieMapper {
    MovieMapper INSTANCE = Mappers.getMapper(MovieMapper.class);

    MovieListDTO toMovieListDTO(Movie movie, int totalFunding);

    MovieDTO toMovieDTO(Movie movie, int totalFunding, int fundingCount, int likeCount);
}
