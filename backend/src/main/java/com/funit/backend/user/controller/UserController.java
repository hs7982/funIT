package com.funit.backend.user.controller;

import com.funit.backend.user.dto.UserRequestDTO;
import com.funit.backend.user.service.UserService;
import com.funit.backend.response.ResponseHandler;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * 사용자와 관련된 기능의 컨트롤러
 */

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<Object> signup(@Valid @RequestBody UserRequestDTO.UserSingupDTO user) {
        int userid = userService.save(user);
        return ResponseHandler.responseBuilder(
                HttpStatus.CREATED,
                "계정이 생성되었습니다.",
                userid
        );
    }

}
