package com.funit.backend.user.controller;

import com.funit.backend.credit.CreditController;
import com.funit.backend.credit.CreditService;
import com.funit.backend.credit.domain.CreditRepository;
import com.funit.backend.user.domain.AuthUser;
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
    private final CreditService creditService;

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
    public ResponseEntity<Object> getMyInfo(Principal principal) {
        try {
            User user = (User) userDetailService.loadUserByUsername(principal.getName());
            UserResponseDTO dto = UserResponseDTO.toMeDTO(user);
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

    // 마이페이지 조회
    @GetMapping("/mypage")
    public ResponseEntity<Object> getMyPage(@AuthUser User user) {
        try {
            int credit = creditService.getUserCredit(user.getId());
            UserResponseDTO dto = UserResponseDTO.toMypageDTO(user, credit);
            return ResponseHandler.responseBuilder(
                    HttpStatus.OK,
                    "마이페이지 정보 조회 성공",
                    dto
            );
        } catch (Exception e) {
            return ResponseHandler.responseBuilder(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "마이페이지 정보 조회 실패",
                    null
            );
        }
    }

    // 마이페이지 수정
    @PostMapping("/mypage")
    public ResponseEntity<Object> updateMyPage(@Valid @RequestBody UserRequestDTO.UserSingupDTO updateDTO, Principal principal) {
        try {
            User user = (User) userDetailService.loadUserByUsername(principal.getName());
            // 업데이트 로직 수행
            // 예시: user.setEmail(updateDTO.getEmail());
            // userService.update(user);
            return ResponseHandler.responseBuilder(
                    HttpStatus.OK,
                    "마이페이지 정보 수정 성공",
                    null
            );
        } catch (Exception e) {
            return ResponseHandler.responseBuilder(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "마이페이지 정보 수정 실패",
                    null
            );
        }
    }


}
