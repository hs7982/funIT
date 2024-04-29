package com.funit.backend.funding;

import com.funit.backend.funding.domain.Funding;
import com.funit.backend.funding.domain.FundingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FundingService {
    @Autowired
    FundingRepository fundingRepository;

    public List<Funding> getAllFundings() {
        return fundingRepository.findAll();
    }
}
