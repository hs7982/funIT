package com.funit.backend.user.dto;

import com.funit.backend.user.domain.User;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class UserResponseDTO {
    private int id;
    private String email;
    private String name;
    private String profileImage;
    private int credit;
    private String tel;
    private String role;

    public static UserResponseDTO toMeDTO(User user) {
        return UserResponseDTO.builder()
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .profileImage(user.getProfileImage())
                .role(user.getRole())
                .build();
    }

    public static UserResponseDTO toMypageDTO(User user, int newCredit) {
        return UserResponseDTO.builder()
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .profileImage(user.getProfileImage())
                .credit(newCredit)
                .tel(user.getTel())
                .build();
    }
}
