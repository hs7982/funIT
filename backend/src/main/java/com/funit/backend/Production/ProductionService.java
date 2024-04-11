package com.funit.backend.Production;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductionService {
    @Autowired
    ProductionRepository productionRepository;
    public List<ProductionEntity> getAllProduction() { return productionRepository.findAll(); }
}
