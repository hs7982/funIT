package com.funit.backend.controller;

import com.funit.backend.entity.User;
import com.funit.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("/users")
    public List<User>getAllUsers(){
        List<User> user = userService.getAllUsers();
        return user;
    }
}
