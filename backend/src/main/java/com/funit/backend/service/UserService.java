package com.funit.backend.service;


import com.funit.backend.dto.UserDTO;
import com.funit.backend.entity.User;
import com.funit.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public List<User> getAllUsers() {

        return userRepository.findAll();
    }
}
