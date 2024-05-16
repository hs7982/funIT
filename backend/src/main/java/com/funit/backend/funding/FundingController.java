package com.funit.backend.funding;

import com.funit.backend.funding.domain.Funding;
import com.funit.backend.utils.response.ResponseHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
