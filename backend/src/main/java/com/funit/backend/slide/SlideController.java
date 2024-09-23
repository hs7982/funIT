package com.funit.backend.slide;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/slides")
public class SlideController {
    @Autowired
    private SlideService slideService;

    @GetMapping
    public List<Slide> getAllSlides() {
        return slideService.getAllSlides();
    }

    @PostMapping
    public void addSlide(@RequestBody Slide slide) {
        slideService.addSlide(slide);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSlide(@PathVariable int id) {
        slideService.deleteSlide(id);
        return ResponseEntity.noContent().build();
    }

}
