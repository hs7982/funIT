package com.funit.backend.Funding;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FundingService {
    @Autowired
    FundingRepository fundingRepository;
    public List<FundingEntity> getAllFundings() { return fundingRepository.findAll(); }
}
