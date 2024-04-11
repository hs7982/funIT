package com.funit.backend.Credit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CreditService {
    @Autowired
    CreditRepository creditRepository;
    public List<CreditEntity> getAllCredits() { return creditRepository.findAll(); }
}
