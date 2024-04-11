package com.funit.backend.Credit;

import com.funit.backend.Funding.FundingEntity;
import com.funit.backend.User.UserEntity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class CreditEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "credit_id", updatable = false)
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private UserEntity user;

    @Column(name = "amount", nullable = false)
    private int amount;

    @Column(name = "transaction_type", nullable = false)
    private int transactionType; //차감인지 적립인지

    @CreationTimestamp
    @Column(name = "transaction_date")
    private LocalDateTime transactionDate;

    @ManyToOne
    @JoinColumn(name = "funding_id", referencedColumnName = "funding_id")
    private FundingEntity funding;
}
