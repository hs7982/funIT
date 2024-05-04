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
import org.springframework.security.web.context.DelegatingSecurityContextRepository;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.RequestAttributeSecurityContextRepository;

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

        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(AbstractHttpConfigurer::disable)
//                .httpBasic(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .addFilterAt(
                        this.abstractAuthenticationProcessingFilter(authenticationManager),
                        UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests((auth) -> auth
                        .requestMatchers("/api/admin/**").hasRole("admin")
                        .requestMatchers("/api/user/**").hasRole("USER")
                        .requestMatchers("/api/loginOnly").authenticated()
                        .anyRequest().permitAll()   // authenticated ( 허용 x 나중에 permitAll을 authenticated로 바꿔야 됨 )
                )
                .logout((logout) -> logout
                        .logoutUrl("/api/users/logout")
                        .invalidateHttpSession(true)
                        .deleteCookies("JSESSIONID")
                        .logoutSuccessHandler(((request, response, authentication) -> SecurityContextHolder.clearContext())))
                .sessionManagement(sessionManagementConfigurer -> // 세션 정책 적용
                        sessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
                                .sessionFixation(
                                        SessionManagementConfigurer.SessionFixationConfigurer::newSession) // session rotate 허용
                                .maximumSessions(1) // 세션 쿠키는 한 개만 허용
                );
        return http.build();
    }

    @Bean
    public DelegatingSecurityContextRepository delegatingSecurityContextRepository() {
        return new DelegatingSecurityContextRepository(
                new RequestAttributeSecurityContextRepository(),
                new HttpSessionSecurityContextRepository()
        );
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public AbstractAuthenticationProcessingFilter abstractAuthenticationProcessingFilter(final AuthenticationManager authenticationManager) {
        LoginAuthenticationFilter loginAuthenticationFilter = new LoginAuthenticationFilter(
                "/api/users/login",
                authenticationManager
        );
        loginAuthenticationFilter.setAuthenticationSuccessHandler(successHandler);
        loginAuthenticationFilter.setAuthenticationFailureHandler(failureHandler);
        return loginAuthenticationFilter;
    }
}
