package com.funit.backend.funding;

import com.funit.backend.funding.domain.Funding;
import com.funit.backend.user.domain.AuthUser;
import com.funit.backend.user.domain.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
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
    public FundingDTO getTotalFunding(@PathVariable int movieId) {
        return fundingService.getTotalFundingByMoiveId(movieId);
    }

    /**
     * 영화에 펀딩하는 메소드
     */
    @PostMapping()
    public Funding newFunding(@AuthUser User user, @Valid @RequestBody FundingDTO.FundingMoney dto) {
        return fundingService.getAddFundingCredit(user, dto);
    }
}
