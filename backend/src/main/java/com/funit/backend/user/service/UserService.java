package com.funit.backend.user.service;

import com.funit.backend.credit.domain.Credit;
import com.funit.backend.credit.domain.CreditRepository;
import com.funit.backend.user.domain.User;
import com.funit.backend.user.domain.UserRepository;
import com.funit.backend.user.dto.UserRequestDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final CreditRepository creditRepository;

    private static final int DEFAULT_CREDITS = 10000000; // 기본 크레딧 값 설정
    private static final int TRANSACTION_TYPE_INITIAL = 1; // 초기 적립 타입 설정
    public int save(UserRequestDTO.UserSingupDTO dto) {
        if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new IllegalArgumentException("이미 사용중인 이메일입니다.");
        }
//        User user = User.builder()
//                .email(dto.getEmail())
//                .password(bCryptPasswordEncoder.encode(dto.getPassword()))
//                .name(dto.getName())
//                .tel(dto.getTel())
//                .gender(dto.getGender())
//                //.credit(DEFAULT_CREDITS) // 기본 크레딧 값 설정
//                .build();
//        return userRepository.save(user).getId();

        User user = User.builder()
                .email(dto.getEmail())
                .password(bCryptPasswordEncoder.encode(dto.getPassword()))
                .name(dto.getName())
                .tel(dto.getTel())
                .gender(dto.getGender())
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

    @Transactional
    public void changePassword(User user, String newPassword) {
        String newEncodePW = bCryptPasswordEncoder.encode(newPassword);
        userRepository.updatePW(newEncodePW, user.getId());
    }

    @Transactional
    public void changeName(User user, String newName) {
        //String newEncodePW = bCryptPasswordEncoder.encode(newName);
        userRepository.updateName(newName, user.getId());
    }

}
