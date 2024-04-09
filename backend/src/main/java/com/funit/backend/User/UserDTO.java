package com.funit.backend.User;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserDTO {
    private int id_no;
    private String email;
    private String password;
    private String tel;
    private String permission;
    private String join_date;
}
