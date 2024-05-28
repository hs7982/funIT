package com.funit.backend.funding;

import com.funit.backend.credit.CreditService;
import com.funit.backend.funding.domain.Funding;
import com.funit.backend.funding.domain.FundingRepository;
import com.funit.backend.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FundingService {
    private final FundingRepository fundingRepository;
    @Autowired
    CreditService CreditService;

    public List<Funding> getAllFundings() {
        return fundingRepository.findAll();
    }

    public FundingDTO getTotalFundingByMoiveId(int movieId) {
        int totalFunding = fundingRepository.findTotalFundingByMovieId(movieId);
        return new FundingDTO(totalFunding);
    }

    public Funding getAddFundingCredit(User user, FundingDTO.FundingMoney request) {
        //크레딧 서비스 getUserCredit 호출해서 비교하고
        if (CreditService.getUserCredit(user.getId()) < request.getFundingMoney()) {
            throw new IllegalArgumentException("금액이 부족합니다.");
        }
        //펀딩에 데이터 삽입
        Funding funding = fundingRepository.save(request.toEntity()); //movieId, credit
        //크레딧 서비스 호출 크레딧 또 빼고
        CreditService.deductMoney(user, request.getFundingMoney(), funding);

        return  funding;
    }


    public Integer countFunding(Integer movieId) {
        return fundingRepository.getCount(movieId);
    }

}
