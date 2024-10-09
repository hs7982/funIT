package com.funit.backend.utils.mapper;

import com.funit.backend.credit.CreditDTO;
import com.funit.backend.funding.FundingDTO;
import com.funit.backend.funding.domain.Funding;
import com.funit.backend.user.domain.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface FundingMapper {
    FundingMapper INSTANCE = Mappers.getMapper(FundingMapper.class);

    @Mapping(target = "movieId", source = "movie.id")
    @Mapping(target = "movieTitle", source = "movie.title")
    @Mapping(target = "movieStatus", source = "movie.status")
    FundingDTO.FundingDetail toDetailDTO(Funding funding);

    @Mapping(target = "fundingDetail", source = "funding")
    @Mapping(target = "credits", source = "credits")
    FundingDTO.FundingDetailWithCreditsDTO toFundingDetailWithCreditsDTO(FundingDTO.FundingDetail funding, List<CreditDTO> credits);

    @Mapping(target = "fundingDetail", source = "funding")
    @Mapping(target = "userid", source = "user.id")
    @Mapping(target = "userName", source = "user.name")
    @Mapping(target = "userTel", source = "user.tel")
    @Mapping(target = "userProfileImage", source = "user.profileImage")
    FundingDTO.FundingDetailWithUser toFundingDetailWithUser(FundingDTO.FundingDetail funding, User user);
}
