package com.funit.backend.user.controller;

import com.funit.backend.credit.CreditService;
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

    /**
     * 회원가입 컨트롤러
     *
     * @param user DTO 방식으로 사용자의 값 입력받고, 입력값 검증수행
     */
    @PostMapping("/signup")
    public ResponseEntity<Object> signup(@Valid @RequestBody UserRequestDTO.UserSingup user) {
        int userid = userService.save(user);
        return ResponseHandler.responseBuilder(
                HttpStatus.CREATED,
                "계정이 생성되었습니다.",
                userid
        );
    }

    /**
     * 로그아웃 컨트롤러
     */
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

    /**
     * 현재 로그인한 사용자의 정보 획득
     * FrontEnd 페이지 갱신시 마다 호출되어 로그인상태 검증함
     */
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

    /**
     * 현재 로그인한 사용자의 마이페이지 관련 정보 GET
     */
    @GetMapping("/mypage")
    public ResponseEntity<Object> getMyPage(@AuthUser User user) {
        int credit = creditService.getUserCredit(user.getId());
        UserResponseDTO dto = UserResponseDTO.toMypageDTO(user, credit);
        return ResponseHandler.responseBuilder(
                HttpStatus.OK,
                "마이페이지 정보 조회 성공",
                dto
        );
    }

    /**
     * 현재 로그인한 사용자의 마이페이지 관련 정보 수정
     */
    @PostMapping("/mypage")
    public ResponseEntity<Object> updateMyPage(@Valid @RequestBody UserRequestDTO.UserSingup updateDTO, Principal principal) {
        User user = (User) userDetailService.loadUserByUsername(principal.getName());
        // 업데이트 로직 수행
        // 예시: user.setEmail(updateDTO.getEmail());
        // userService.update(user);
        return ResponseHandler.responseBuilder(
                HttpStatus.OK,
                "마이페이지 정보 수정 성공",
                null
        );
    }

    /**
     * 로그인한 사용자 본인계정의 비밀번호 변경
     */
    @PostMapping("/change-pw")
    public ResponseEntity<Object> changePassword(@AuthUser User user, @Valid @RequestBody UserRequestDTO.PasswordChange newPassword) {
        userService.changePassword(user, newPassword.getNewPassword());
        return ResponseHandler.responseBuilder(
                HttpStatus.OK,
                "비밀번호 정보 수정 성공",
                null
        );
    }

    /**
     * 로그인한 사용자 자신의 이름 변경
     */
    @PostMapping("/change-name")
    public ResponseEntity<Object> changeName(@AuthUser User user, @Valid @RequestBody UserRequestDTO.NameChange request) {
        userService.changeName(user, request.newName);
        return ResponseHandler.responseBuilder(
                HttpStatus.OK,
                "이름 정보 수정 성공",
                null
        );
    }


}
