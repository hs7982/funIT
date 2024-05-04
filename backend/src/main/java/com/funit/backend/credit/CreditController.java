package com.funit.backend.credit;

import com.funit.backend.credit.domain.Credit;
import com.funit.backend.utils.response.ResponseHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/credits")
public class CreditController {
    @Autowired
    CreditService creditService;

    public ResponseEntity<Object> getAllCredit() {
        List<Credit> credit = creditService.getAllCredits();
        return ResponseHandler.responseBuilder(
                HttpStatus.OK,
                null,
                credit
        );
    }
}
