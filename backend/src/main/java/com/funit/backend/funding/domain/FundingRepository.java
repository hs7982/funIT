package com.funit.backend.funding.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FundingRepository extends JpaRepository<Funding, Integer> {

    @Query("SELECT SUM(i.fundingCmount) FROM Funding i WHERE i.movie.id = :movieId")
    int findTotalFundingByMovieId(@Param("movieId") int movieId);

}
