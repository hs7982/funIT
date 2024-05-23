package com.funit.backend.credit;

import com.funit.backend.credit.domain.Credit;
import com.funit.backend.user.domain.User;

public class CreditDTO {
    //credit 금액, userid
    private User user;
    private int money;
    public Credit toEntity() {
        return Credit.builder()
                .user(user)
                .amount(money)

                .build();
    }
}
