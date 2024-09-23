package com.funit.backend.slide;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;


@Service
public class SlideService {
    @Autowired
    private SlideRepository slideRepository;

    public List<Slide> getAllSlides() {
        return slideRepository.findAll();
    }

    public void addSlide(Slide slide) {
        slideRepository.save(slide);
    }

    public void deleteSlide(int id) {
        slideRepository.deleteById(id);
    }

}
