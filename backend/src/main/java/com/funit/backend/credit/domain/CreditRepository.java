package com.funit.backend.credit.domain;

import com.funit.backend.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CreditRepository extends JpaRepository<Credit, Integer> {
    @Query("SELECT COALESCE(SUM(i.amount), 0) FROM Credit i WHERE i.user.id = :userId")
    int findTotalCreditUserId(@Param("userId") int userId);


    @Query("select c from Credit c where c.user.id = :userId")
    List<Credit> findByUserHistory(@Param("userId") int userId);

    @Query("select c.user from Credit c where c.funding.id = :fundingId")
    User getUserByFundingId(@Param("fundingId") int fundingId);

    List<Credit> findByFundingId(int fundingId);
}
