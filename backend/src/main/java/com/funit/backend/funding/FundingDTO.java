package com.funit.backend.funding;

import com.funit.backend.credit.CreditDTO;
import com.funit.backend.funding.domain.Funding;
import com.funit.backend.movie.domain.Movie;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class FundingDTO {
    private int fundingTotalAmount;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class FundingMoney {
        @NotNull(message = "투자 금액을 입력해주세요.")
        @Min(value = 1, message = "투자 금액은 1 크레딧 이상이어야 합니다.")
        private int fundingMoney;

        private Movie movie;

        public Funding toEntity() {
            return Funding.builder()
                    .movie(movie)
                    .fundingAmount(fundingMoney)

                    .build();
        }
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class FundingDetail {
        private int id;
        private LocalDateTime dateTime;
        private int fundingAmount;
        private int MovieId;
        private String MovieTitle;
        private int movieStatus;
        private int refundOrno;
        private String refundReason;
    }

    @Data
    public static class FundingDetailWithCreditsDTO {
        private FundingDTO.FundingDetail fundingDetail;
        private List<CreditDTO> credits;
    }

    @Data
    public static class FundingDetailWithUser {
        private FundingDTO.FundingDetail fundingDetail;
        private int userid;
        private String userEmail;
        private String userName;
        private String userTel;
        private String userProfileImage;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class FundingRefund {
        @NotBlank(message = "환불 요청사유는 필수입니다.")
        @Size(min = 5, max = 50, message = "요청사유는 5자이상, 50자 미만입니다.")
        private String reason;
    }
}
