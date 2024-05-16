package com.funit.backend.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.funit.backend.user.service.UserDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.SessionManagementConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private final UserDetailService userService;
    private final ObjectMapper objectMapper;
    private final AuthenticationSuccessHandler successHandler;
    private final AuthenticationFailureHandler failureHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder sharedObject = http.getSharedObject(AuthenticationManagerBuilder.class);
        AuthenticationManager authenticationManager = sharedObject.build();

        http.authenticationManager(authenticationManager);

        configureHttpSecurity(http, authenticationManager);
        return http.build();
    }

    private void configureHttpSecurity(HttpSecurity http, AuthenticationManager authenticationManager) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(AbstractHttpConfigurer::disable) // 실제 CORS 설정을 여기에 추가
                .formLogin(AbstractHttpConfigurer::disable)
                .addFilterAt(
                        loginAuthenticationFilter(authenticationManager),
                        UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests((auth) -> auth
                        .requestMatchers("/api/admin/**").hasAuthority("ROLE_admin")
                        .requestMatchers("/api/user/**").hasAuthority("ROLE_user")
                        .requestMatchers("/api/loginOnly").authenticated()
                        .anyRequest().permitAll()
                )
                .logout((logout) -> logout
                        .logoutUrl("/api/users/logout")
                        .invalidateHttpSession(true)
                        .deleteCookies("JSESSIONID")
                        .logoutSuccessHandler(((request, response, authentication) -> SecurityContextHolder.clearContext())))
                .sessionManagement(sessionManagementConfigurer -> // 세션 정책 적용
                        sessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
                                .sessionFixation(SessionManagementConfigurer.SessionFixationConfigurer::migrateSession) // session rotate 허용
                                .maximumSessions(1) // 세션 쿠키는 한 개만 허용
                );
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public AbstractAuthenticationProcessingFilter loginAuthenticationFilter(final AuthenticationManager authenticationManager) {
        LoginAuthenticationFilter loginAuthenticationFilter = new LoginAuthenticationFilter(
                "/api/users/login",
                authenticationManager
        );
        loginAuthenticationFilter.setAuthenticationSuccessHandler(successHandler);
        loginAuthenticationFilter.setAuthenticationFailureHandler(failureHandler);
        return loginAuthenticationFilter;
    }
}
