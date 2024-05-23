package com.funit.backend.credit.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CreditRepository extends JpaRepository<Credit, Integer> {
    @Query("SELECT COALESCE(SUM(i.amount), 0) FROM Credit i WHERE i.user.id = :userId")
    int findTotalCreditUserId(@Param("userId") int userId);


}
