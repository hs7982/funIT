package com.funit.backend.Like;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LikeService {
    @Autowired
    LikeRepository likeRepository;

    public List<LikeEntity> getAllLikes() { return likeRepository.findAll(); }

}
