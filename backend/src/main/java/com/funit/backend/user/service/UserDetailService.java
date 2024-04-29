package com.funit.backend.user.service;

import com.funit.backend.user.domain.User;
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

    //    @Override
//    public UserDetails loadUserByUsername(String email) {
//        return (UserDetails) userRepository.findByEmail(email)
//                .orElseThrow(() -> new IllegalArgumentException(email));
//    }
    @Override
    public UserDetails loadUserByUsername(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail()) // assuming email is the username
                .password(user.getPassword()) // assuming password is already encoded
                .roles("USER") // assuming a role "USER"
                .build();
    }
}