package com.funit.backend.production;

import com.funit.backend.production.domain.Production;
import com.funit.backend.production.domain.ProductionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductionService {
    @Autowired
    ProductionRepository productionRepository;

    public List<Production> getAllProduction() {
        return productionRepository.findAll();
    }
}
