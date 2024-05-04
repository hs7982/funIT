package com.funit.backend.user.service;

import com.funit.backend.user.domain.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserDetailService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) {

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Email에 해당하는 사용자를 찾을 수 없습니다: " + email));
    }
}