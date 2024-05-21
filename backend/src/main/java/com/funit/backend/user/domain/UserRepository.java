package com.funit.backend.user.domain;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);


    @Modifying(clearAutomatically = true)
    @Transactional
    @Query("UPDATE User m SET m.password = :password where m.id = :id")
    int updatePW(@Param(value="password") String password, @Param(value="id") int id);

    @Modifying(clearAutomatically = true)
    @Transactional
    @Query("UPDATE User m SET m.name = :name where m.id = :id")
    int updateName(@Param(value="name") String name, @Param(value="id") int id);

}
