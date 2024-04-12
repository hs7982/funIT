package com.funit.backend.Funding;

import com.funit.backend.response.ResponseHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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
        List<FundingEntity> funding = fundingService.getAllFundings();
        return ResponseHandler.responseBuilder(
                HttpStatus.OK,
                null,
                funding
        );
    }
}
