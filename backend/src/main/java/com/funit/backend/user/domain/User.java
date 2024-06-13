package com.funit.backend.user.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Data
@DynamicInsert
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", updatable = false)
    private int id;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @JsonIgnore
    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "name")
    private String name;

    @Column(name = "tel")
    private String tel;

    @Column(name = "role", nullable = false, columnDefinition = "VARCHAR(20) DEFAULT 'user'")
    private String role;

    @Column(name = "gender")
    private String gender;

    @Column(name = "profile_image")
    private String profileImage;

    @CreationTimestamp
    @Column(name = "join_date", nullable = false, updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime joinDate;

    @UpdateTimestamp
    @Column(name = "update_date")
    private LocalDateTime updateDate;

    @Column(name = "enabled", nullable = false, columnDefinition = "BOOLEAN DEFAULT TRUE")
    private boolean enabled;

    @Column(name = "nonLock", nullable = false, columnDefinition = "BOOLEAN DEFAULT TRUE")
    private boolean nonLock;

    //권한 반환
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role));
    }

    //사용자 id 반환(이메일)
    @Override
    public String getUsername() {
        return email;
    }

    //사용자 password 반환
    @Override
    public String getPassword() {
        return password;
    }

    //계정 만료 여부 반환 true:만료되지 않음
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    //계정 잠금 여부 반환 true:잠금되지 않음
    @Override
    public boolean isAccountNonLocked() {
        return nonLock;
    }

    //패스워드 만료 여부 반환 true:만료되지 않음
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    //계정 활성화 여부 반환 true:사용가능
    @Override
    public boolean isEnabled() {
        return enabled;
    }
}
