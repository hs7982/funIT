package com.funit.backend.funding;

import com.funit.backend.credit.CreditDTO;
import com.funit.backend.credit.CreditService;
import com.funit.backend.funding.domain.Funding;
import com.funit.backend.funding.domain.FundingRepository;
import com.funit.backend.movie.domain.Movie;
import com.funit.backend.movie.domain.MovieRepository;
import com.funit.backend.user.domain.User;
import com.funit.backend.utils.mapper.FundingMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Log4j2
@Service
@RequiredArgsConstructor
public class FundingService {
    private final FundingRepository fundingRepository;
    private final CreditService CreditService;
    private final MovieRepository movieRepository;
    private final CreditService creditService;

    public FundingDTO getTotalFundingByMoiveId(int movieId) {
        int totalFunding = fundingRepository.findTotalFundingByMovieId(movieId);
        return new FundingDTO(totalFunding);
    }

    public List<Funding> getFundingByMovieId(int movieId) {
        return fundingRepository.getFundingByMovieId(movieId).orElseThrow(() -> new IllegalArgumentException("null"));
    }

    public FundingDTO.FundingDetailWithCreditsDTO getFundingDetail(User user, int fundingId) {
        Funding funding = fundingRepository.getFundingById(fundingId).orElseThrow(() -> new IllegalArgumentException("해당 펀딩을 찾을 수 없습니다."));

        if (creditService.getUserByFundingId(fundingId).getId() != user.getId())
            throw new AccessDeniedException("해당 정보에 접근할 권한이 없습니다!");
        FundingDTO.FundingDetail fundingDetail = FundingMapper.INSTANCE.toDetailDTO(funding);
        List<CreditDTO> credits = creditService.getCreditByFundingId(fundingId);
        return FundingMapper.INSTANCE.toFundingDetailWithCreditsDTO(fundingDetail, credits);
    }

    public void refundFunding(User user, int fundingId, String reason) {
        Funding funding = fundingRepository.getFundingById(fundingId).orElseThrow(() -> new IllegalArgumentException("해당 펀딩을 찾을 수 없습니다."));
        User fundingUser = creditService.getUserByFundingId(fundingId);
        if (user.getId() != fundingUser.getId()) {
            throw new AccessDeniedException("환불할 권한이 없습니다!");
        }
        if (funding.getRefundOrno() == 1) {
            throw new IllegalArgumentException("이미 환불된 투자입니다!");
        }
        refundFunding(funding, reason + "(사용자 요청)");

    }

    public void refundFunding(Funding funding, String reason) {
        User user = creditService.getUserByFundingId(funding.getId());
        if (funding.getRefundOrno() == 1) {
            log.info("[Funding] 이미 환불된 항목이 재시도됨, skip - user:{}, fundingId:{}, reason:{}", user.getEmail(), funding.getId(), reason);
        } else {
            fundingRepository.refundFundingById(funding.getId(), reason);
            creditService.refund(user, funding.getFundingAmount(), funding);
            log.info("[Funding] 환불처리 - user:{}, fundingId:{}, reason:{}, credit:{}", user.getEmail(), funding.getId(), reason, funding.getFundingAmount());
        }
    }


    public Funding fundingCredit(User user, FundingDTO.FundingMoney request) {
        //투자 기간이 마감되면 예외처리
        LocalDateTime currentTime = LocalDateTime.now();
        Movie movie = movieRepository.getById(request.getMovie().getId());
        if (isInvestmentPeriodClosed(currentTime, movie.getEndDate())) {
            throw new IllegalArgumentException("투자 기간이 이미 종료되었습니다.");
        }
        switch (movie.getStatus()) {
            case 2:
                throw new IllegalArgumentException("종료된 프로젝트입니다.");
            case 3:
                throw new IllegalArgumentException("취소된 프로젝트입니다.");
        }
        //크레딧 서비스 getUserCredit 호출해서 비교하고
        if (CreditService.getUserCredit(user.getId()) < request.getFundingMoney()) {
            throw new IllegalArgumentException("금액이 부족합니다.");
        }
        log.info("[Funding] 새로운 펀딩 프로세스 진행 - user:{}, movieId:{}, credit:{}", user.getEmail(), request.getMovie().getId(), request.getFundingMoney());
        //펀딩에 데이터 삽입
        Funding funding = fundingRepository.save(request.toEntity()); //movieId, credit
        //크레딧 서비스 호출 크레딧 또 빼고
        CreditService.deduct(user, request.getFundingMoney(), funding);

        return funding;
    }

    public boolean isInvestmentPeriodClosed(LocalDateTime currentTime, LocalDateTime endTime) {
        return currentTime.isAfter(endTime) || currentTime.isEqual(endTime);
    }

    public Integer countFunding(Integer movieId) {
        return fundingRepository.getCount(movieId);
    }

}
