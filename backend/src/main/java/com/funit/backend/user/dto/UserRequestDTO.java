package com.funit.backend.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class UserRequestDTO {
    @Builder
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UserSingup {
        @NotNull(message = "이메일은 필수값입니다.")
        @Email(message = "이메일 형식이 올바르지 않습니다.")
        private String email;

        @NotBlank(message = "비밀번호는 필수값입니다.")
        @Size(min = 6, max = 20, message = "비밀번호는 6자이상, 20자 이하여야합니다.")
        private String password;

        @NotBlank(message = "이름은 필수값입니다.")
        private String name;

        @NotBlank(message = "전화번호는 필수값입니다.")
        private String tel;
        private String gender;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PasswordChange {
        @NotNull(message = "현재 비밀번호는 필수값입니다.")
        private String oriPassword;
        @NotNull(message = "새로운 비밀번호는 필수값입니다.")
        @Size(min = 6, max = 20, message = "비밀번호는 6자이상, 20자 이하여야합니다.")
        private String newPassword;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UpdateUser {
        @NotNull(message = "이메일은 필수값입니다.")
        @Email(message = "이메일 형식이 올바르지 않습니다.")
        private String email;
        @NotBlank(message = "이름은 필수값입니다.")
        private String name;
        @NotBlank(message = "전화번호는 필수값입니다.")
        private String tel;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class NameChange {
        @NotNull(message = "새로운 이름은 필수값입니다.")
        public String newName;
    }
}
