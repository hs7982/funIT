package com.funit.backend.utils.mapper;

import com.funit.backend.like.LikeDTO;
import com.funit.backend.like.domain.MovieLike;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface LikeMapper {
    LikeMapper INSTANCE = Mappers.getMapper(LikeMapper.class);

    @Named("toLikeDTO")
    @Mapping(target = "movieId", source = "movie.id")
    @Mapping(target = "movieTitle", source = "movie.title")
    LikeDTO.MyLike toLikeDTO(MovieLike movieLike);

    @IterableMapping(qualifiedByName = "toLikeDTO")
    List<LikeDTO.MyLike> toLikeDTO(List<MovieLike> like);
}
