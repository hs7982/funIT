package com.funit.backend.Auth;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AuthController {

    @GetMapping("/login")
    public String login() {
        return "login"; // login.html 또는 login.jsp와 같은 로그인 페이지의 경로
    }
}
