package com.funit.backend.Funding;

import com.funit.backend.Movie.MovieEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class FundingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "funding_id", updatable = false)
    private int id;

    @ManyToOne
    @JoinColumn(name = "movie_id", referencedColumnName = "movie_id")
    private MovieEntity movie;

    @Column(name = "funding_amount", nullable = false)
    private int fundingCmount;

    @Column(name = "funding_status", nullable = false, columnDefinition = "INT DEFAULT 1")
    private int fundingStatus; //완료, 환불

    @Column(name = "refund_ornot",nullable = false, columnDefinition = "INT DEFAULT 1")
    private int refundOrno;

    @Column(name = "refund_reason")
    private String refundReason;

}