package com.funit.backend.funding.domain;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FundingRepository extends JpaRepository<Funding, Integer> {

    @Query("SELECT COALESCE(SUM(i.fundingAmount), 0) FROM Funding i WHERE i.movie.id = :movieId and i.refundOrno = 0")
    int findTotalFundingByMovieId(@Param("movieId") int movieId);

    @Modifying(clearAutomatically = true)
    @Transactional
    @Query("UPDATE User m SET m.name = :name where m.id = :id")
    int updateName(@Param(value = "name") String name, @Param(value = "id") int id);

    @Query(value = "select count(*) from Funding f where f.movie.id = :movieId and f.refundOrno = 0")
    Integer getCount(Integer movieId);

    Optional<List<Funding>> getFundingByMovieId(int movieId);

    @Modifying
    @Transactional
    @Query("UPDATE Funding f SET f.refundOrno = 1, f.refundReason = :reason WHERE f.id=:id")
    int refundFundingById(@Param(value = "id") int fundingId, @Param(value = "reason") String reason);

    Optional<Funding> getFundingById(int fundingId);
}
