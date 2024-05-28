package com.funit.backend.funding.domain;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FundingRepository extends JpaRepository<Funding, Integer> {

    @Query("SELECT COALESCE(SUM(i.fundingCmount), 0) FROM Funding i WHERE i.movie.id = :movieId")
    int findTotalFundingByMovieId(@Param("movieId") int movieId);

    @Modifying(clearAutomatically = true)
    @Transactional
    @Query("UPDATE User m SET m.name = :name where m.id = :id")
    int updateName(@Param(value="name") String name, @Param(value="id") int id);

    @Query(value = "select count(*) from Funding f where f.movie.id = :movieId")
    Integer getCount(Integer movieId);
}
