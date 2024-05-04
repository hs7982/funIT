package com.funit.backend.production;

import com.funit.backend.production.domain.Production;
import com.funit.backend.utils.response.ResponseHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/productions")
public class ProductionController {
    @Autowired
    ProductionService productionService;

    @GetMapping()
    public ResponseEntity<Object> getAllProduction() {
        List<Production> production = productionService.getAllProduction();
        return ResponseHandler.responseBuilder(
                HttpStatus.OK,
                null,
                production
        );
    }
}
