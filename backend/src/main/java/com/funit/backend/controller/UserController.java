package com.funit.backend.controller;

import com.funit.backend.entity.User;
import com.funit.backend.response.ResponseHandler;
import com.funit.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 사용자와 관련된 기능의 컨트롤러
 */

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    UserService userService;

    /**
     * 모든 사용자 리스트를 반환합니다.
     */
    @GetMapping()
    public ResponseEntity<Object> getAllUsers() {
        List<User> user = userService.getAllUsers();
        return ResponseHandler.responseBuilder(
                HttpStatus.OK,
                null,
                user
        );
    }
}
