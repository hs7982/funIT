package com.funit.backend.funding;

import com.funit.backend.funding.domain.Funding;
import com.funit.backend.user.domain.AuthUser;
import com.funit.backend.user.domain.User;
import com.funit.backend.utils.response.ResponseHandler;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fundings")
public class FundingController {
    @Autowired
    FundingService fundingService;

    @GetMapping()
    public ResponseEntity<Object> getAllFunding() {
        List<Funding> funding = fundingService.getAllFundings();
        return ResponseHandler.responseBuilder(
                HttpStatus.OK,
                null,
                funding
        );
    }

    @GetMapping("/total/{movieId}")
    public FundingDTO getTotalFunding(@PathVariable int movieId) {
        return fundingService.getTotalFundingByMoiveId(movieId);
    }

    /**
     *
     *
     * 영화에 펀딩시 펀딩서비스 -> 사용자서비스
     *
     */
    @PostMapping()
    public Funding newFunding(@AuthUser User user, @Valid @RequestBody FundingDTO.FundingMoney dto) {
        System.out.println(dto);
        return fundingService.getAddFundingCredit(user, dto);
    }
}
