package com.funit.backend.credit;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreditDTO {
    private int id;
    private int amount;
    private int transactionType;
    private LocalDateTime transactionDate;
    private String movieTitle;
    private int movieId;
    private int fundingId;
}
