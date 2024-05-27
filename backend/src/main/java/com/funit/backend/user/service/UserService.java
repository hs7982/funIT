package com.funit.backend.user.service;

import com.funit.backend.credit.domain.Credit;
import com.funit.backend.credit.domain.CreditRepository;
import com.funit.backend.s3.ImageService;
import com.funit.backend.user.domain.User;
import com.funit.backend.user.domain.UserRepository;
import com.funit.backend.user.dto.UserRequestDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final CreditRepository creditRepository;
    private final ImageService imageService;

    private static final int DEFAULT_CREDITS = 10000000; // 기본 크레딧 값 설정
    private static final int TRANSACTION_TYPE_INITIAL = 1; // 초기 적립 타입 설정
    private final UserDetailService userDetailService;

    protected Authentication createNewAuthentication(Authentication currentAuth, String username) {
        UserDetails newPrincipal = userDetailService.loadUserByUsername(username);
        UsernamePasswordAuthenticationToken newAuth = new UsernamePasswordAuthenticationToken(newPrincipal, currentAuth.getCredentials(), newPrincipal.getAuthorities());
        newAuth.setDetails(currentAuth.getDetails());
        return newAuth;
    }

    private void updatePrincipal() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();

        SecurityContextHolder.getContext().setAuthentication(createNewAuthentication(authentication, user.getUsername()));
    }

    public int save(UserRequestDTO.UserSingup dto) {
        if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new IllegalArgumentException("이미 사용중인 이메일입니다.");
        }

        User user = User.builder()
                .email(dto.getEmail())
                .password(bCryptPasswordEncoder.encode(dto.getPassword()))
                .name(dto.getName())
                .tel(dto.getTel())
                .gender(dto.getGender())
                .profileImage("/default-profile.png")
                .build();

        user = userRepository.save(user);

        Credit credit = Credit.builder()
                .user(user)
                .amount(DEFAULT_CREDITS)
                .transactionType(TRANSACTION_TYPE_INITIAL)
                .build();

        creditRepository.save(credit);

        return user.getId();
    }

    public String changeProfileImage(MultipartFile file, User user) {
        String imageURL = imageService.saveImage(file, "userProfile");
        userRepository.updateProfileImage(imageURL, user.getId());
        updatePrincipal();
        return imageURL;
    }

    @Transactional
    public void changePassword(User user, String newPassword) {
        String newEncodePW = bCryptPasswordEncoder.encode(newPassword);
        userRepository.updatePW(newEncodePW, user.getId());
    }

    @Transactional
    public void changeName(User user, String newName) {
        userRepository.updateName(newName, user.getId());
        updatePrincipal();
    }

}
