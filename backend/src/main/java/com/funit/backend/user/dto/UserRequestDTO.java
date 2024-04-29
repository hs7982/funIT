package com.funit.backend.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class UserRequestDTO {

    @Builder
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UserSingupDTO {
        @NotNull(message = "이메일은 필수값입니다.")
        @Email(message = "이메일 형식이 올바르지 않습니다.")
        private String email;

        @NotBlank(message = "비밀번호는 필수값입니다.")
        private String password;

        @NotBlank(message = "이름은 필수값입니다.")
        private String name;

        private String tel;
        private String gender;
    }
}
