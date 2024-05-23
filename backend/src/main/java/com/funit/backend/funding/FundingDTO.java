package com.funit.backend.funding;

import com.funit.backend.funding.domain.Funding;
import com.funit.backend.movie.domain.Movie;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FundingDTO {
    private int fundingTotalAmount;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class FundingMoney {
        @NotNull(message = "투자 금액을 입력해주세요.")
        @Min(value = 1, message = "투자 금액은 1 이상이어야 합니다.")
        private int fundingMoney;

        private Movie movie;

        public Funding toEntity() {
            return Funding.builder()
                    .movie(movie)
                    .fundingCmount(fundingMoney)

                    .build();
        }

    }
}
