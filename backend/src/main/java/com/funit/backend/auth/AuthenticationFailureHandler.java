package com.funit.backend.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Slf4j
@Component
public class AuthenticationFailureHandler implements org.springframework.security.web.authentication.AuthenticationFailureHandler {
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        String errMsg = "이메일 또는 비밀번호가 일치하지 않습니다.";

        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setCharacterEncoding("UTF-8");
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

        log.info("[Auth] 실패한 로그인 시도: {}", exception.getMessage());

        if (exception instanceof BadCredentialsException) {
            errMsg = "이메일 또는 비밀번호가 일치하지 않습니다.";
        } else if (exception instanceof DisabledException) {
            errMsg = "계정이 비활성화 되었습니다.";
        } else {
            errMsg = exception.getMessage();
        }

        objectMapper.writeValue(response.getWriter(), errMsg);
    }
}
