package com.funit.backend.funding;

import com.funit.backend.credit.CreditService;
import com.funit.backend.funding.domain.Funding;
import com.funit.backend.funding.domain.FundingRepository;
import com.funit.backend.movie.domain.MovieRepository;
import com.funit.backend.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FundingService {
    private final FundingRepository fundingRepository;
    private final CreditService CreditService;
    private final MovieRepository movieRepository;

    public List<Funding> getAllFundings() {
        return fundingRepository.findAll();
    }

    public FundingDTO getTotalFundingByMoiveId(int movieId) {
        int totalFunding = fundingRepository.findTotalFundingByMovieId(movieId);
        return new FundingDTO(totalFunding);
    }

    public Funding getAddFundingCredit(User user, FundingDTO.FundingMoney request) {
        //투자 기간이 마감되면 오류
        LocalDateTime currentTime = LocalDateTime.now();
        LocalDateTime endTime = movieRepository.getEndTimeByMovieId(request.getMovie().getId());
        if (isInvestmentPeriodClosed(currentTime, endTime)) {
            throw new IllegalArgumentException("투자 기간이 이미 종료되었습니다.");
        }
        //크레딧 서비스 getUserCredit 호출해서 비교하고
        if (CreditService.getUserCredit(user.getId()) < request.getFundingMoney()) {
            throw new IllegalArgumentException("금액이 부족합니다.");
        }
        //펀딩에 데이터 삽입
        Funding funding = fundingRepository.save(request.toEntity()); //movieId, credit
        //크레딧 서비스 호출 크레딧 또 빼고
        CreditService.deductMoney(user, request.getFundingMoney(), funding);

        return funding;
    }

    public boolean isInvestmentPeriodClosed(LocalDateTime currentTime, LocalDateTime endTime) {
        return currentTime.isAfter(endTime) || currentTime.isEqual(endTime);
    }

    public Integer countFunding(Integer movieId) {
        return fundingRepository.getCount(movieId);
    }

}
