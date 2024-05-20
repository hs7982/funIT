package com.funit.backend.funding;

import com.funit.backend.funding.domain.Funding;
import com.funit.backend.funding.domain.FundingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FundingService {
    private final FundingRepository fundingRepository;

    public List<Funding> getAllFundings() {
        return fundingRepository.findAll();
    }

    public FundingDTO getTotalFundingByMoiveId(int movieId) {
        int totalFunding = fundingRepository.findTotalFundingByMovieId(movieId);
        return new FundingDTO(totalFunding);
    }
}
