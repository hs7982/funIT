package com.funit.backend.funding;

import com.funit.backend.funding.domain.Funding;
import com.funit.backend.user.domain.AuthUser;
import com.funit.backend.user.domain.User;
import com.funit.backend.utils.response.ResponseHandler;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/fundings")
public class FundingController {
    private final FundingService fundingService;

    /**
     * 영화 ID를 받고 해당 영화의 펀딩 총액을 반환해줌
     *
     * @param movieId
     */
    @GetMapping("/total/{movieId}")
    public ResponseEntity<Object> getTotalFunding(@PathVariable int movieId) {
        FundingDTO dto = fundingService.getTotalFundingByMoiveId(movieId);
        return ResponseHandler.responseBuilder(
                HttpStatus.OK,
                null,
                dto
        );
    }

    /**
     * 영화에 펀딩하는 메소드
     */
    @PostMapping()
    public ResponseEntity<Object> newFunding(@AuthUser User user, @Valid @RequestBody FundingDTO.FundingMoney dto) {
        Funding funding = fundingService.fundingCredit(user, dto);
        return ResponseHandler.responseBuilder(
                HttpStatus.OK,
                "펀딩이 완료되었습니다.",
                funding
        );
    }

    /**
     * 해당 영화에 총 펀딩 수
     */
    @GetMapping("/{movieId}/count")
    public ResponseEntity<Object> getFundingCount(@PathVariable Integer movieId) {
        int count = fundingService.countFunding(movieId);
        return ResponseHandler.responseBuilder(
                HttpStatus.OK,
                null,
                count
        );
    }

    /**
     * 투자에 대한 상세정보를 불러옵니다.
     *
     * @param fundingId
     * @return
     */
    @GetMapping("/{fundingId}")
    public ResponseEntity<Object> getFunding(@AuthUser User user, @PathVariable Integer fundingId) {
        return ResponseHandler.responseBuilder(
                HttpStatus.OK,
                null,
                fundingService.getFundingDetail(user, fundingId)
        );
    }

    /**
     * 투자에 대한 환불 요청
     *
     * @param user
     * @param fundingId
     * @param reason
     * @return
     */
    @PostMapping("/refund/{fundingId}")
    public ResponseEntity<Object> refundFunding(@AuthUser User user, @PathVariable Integer fundingId, @RequestBody @Valid FundingDTO.FundingRefund reason) {
        fundingService.refundFunding(user, fundingId, reason.getReason());
        return ResponseHandler.responseBuilder(
                HttpStatus.OK,
                "요청한 투자에 대한 환불이 완료되었습니다.",
                null
        );
    }

    @GetMapping("/detail/{movieId}")
    public ResponseEntity<Object> getFundingDetail(@AuthUser User user, @PathVariable Integer movieId) {
        return ResponseHandler.responseBuilder(
                HttpStatus.OK,
                null,
                fundingService.getFundingByMovieId(user, movieId)
        );
    }
}
