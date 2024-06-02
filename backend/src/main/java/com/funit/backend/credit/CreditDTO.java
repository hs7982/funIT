package com.funit.backend.credit;

import com.funit.backend.credit.domain.Credit;
import com.funit.backend.funding.domain.Funding;
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
    private Funding funding;

    public static CreditDTO toDTO(Credit credit) {
//        return CreditDTO.builder()
//                .id(credit.getId())
//                .amount(credit.getAmount())
//                .transactionType(credit.getTransactionType())
//                .transactionDate(credit.getTransactionDate())
//                .funding(credit.getFunding())
//                .build();
        CreditDTO dto = new CreditDTO();
        dto.setId(credit.getId());
        dto.setAmount(credit.getAmount());
        dto.setTransactionType(credit.getTransactionType());
        dto.setTransactionDate(credit.getTransactionDate());

        Funding funding = credit.getFunding();
        if (funding != null && funding.getMovie() != null) {
            dto.setMovieTitle(funding.getMovie().getTitle());
            dto.setMovieId(funding.getMovie().getId());
        } else {
            // 처리할 작업 추가 (예: 기본값 설정 또는 예외 처리)
        }

        //dto.setFunding(credit.getFunding());

        return dto;
    }
}
