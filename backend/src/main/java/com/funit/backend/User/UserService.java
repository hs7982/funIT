package com.funit.backend.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }
}
