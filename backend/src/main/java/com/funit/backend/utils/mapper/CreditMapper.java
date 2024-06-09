package com.funit.backend.utils.mapper;

import com.funit.backend.credit.CreditDTO;
import com.funit.backend.credit.domain.Credit;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CreditMapper {
    CreditMapper INSTANCE = Mappers.getMapper(CreditMapper.class);

    @Named("toCreditDTO")
    @Mapping(target = "movieId", source = "funding.movie.id")
    @Mapping(target = "movieTitle", source = "funding.movie.title")
    @Mapping(target = "fundingId", source = "funding.id")
    CreditDTO toCreditDTO(Credit credit);

    @IterableMapping(qualifiedByName = "toCreditDTO")
    List<CreditDTO> toCreditDTO(List<Credit> credits);
}
