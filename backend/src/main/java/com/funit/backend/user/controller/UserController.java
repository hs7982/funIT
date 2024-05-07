package com.funit.backend.user.controller;

import com.funit.backend.user.domain.User;
import com.funit.backend.user.dto.UserRequestDTO;
import com.funit.backend.user.dto.UserResponseDTO;
import com.funit.backend.user.service.UserDetailService;
import com.funit.backend.user.service.UserService;
import com.funit.backend.utils.response.ResponseHandler;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

/**
 * 사용자와 관련된 기능의 컨트롤러
 */

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    private final UserDetailService userDetailService;

    @PostMapping("/signup")
    public ResponseEntity<Object> signup(@Valid @RequestBody UserRequestDTO.UserSingupDTO user) {
        int userid = userService.save(user);
        return ResponseHandler.responseBuilder(
                HttpStatus.CREATED,
                "계정이 생성되었습니다.",
                userid
        );
    }

    @GetMapping("/logout")
    public ResponseEntity<Object> logout(HttpServletRequest request, HttpServletResponse response) {
        new SecurityContextLogoutHandler().logout(request, response,
                SecurityContextHolder.getContext().getAuthentication());
        return ResponseHandler.responseBuilder(
                HttpStatus.OK,
                "로그아웃되었습니다.",
                null
        );
    }

    @GetMapping("/me")
//    public ResponseEntity<Object> getMyInfo(@AuthUser User user) {
    public ResponseEntity<Object> getMyInfo(Principal principal) {
        try {
            User user = (User) userDetailService.loadUserByUsername(principal.getName());
            UserResponseDTO dto = UserResponseDTO.toDTO(user);
            return ResponseHandler.responseBuilder(
                    HttpStatus.OK,
                    null,
                    dto
            );
        } catch (Exception e) {
            return ResponseHandler.responseBuilder(
                    HttpStatus.OK,
                    null,
                    false
            );
        }

    }

}
