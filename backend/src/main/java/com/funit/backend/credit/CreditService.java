package com.funit.backend.credit;

import com.funit.backend.credit.domain.Credit;
import com.funit.backend.credit.domain.CreditRepository;
import com.funit.backend.funding.domain.Funding;
import com.funit.backend.user.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CreditService {
    @Autowired
    CreditRepository creditRepository;

    public List<Credit> getAllCredits() {
        return creditRepository.findAll();
    }
    public int getUserCredit(int userid) { return creditRepository.findTotalCreditUserId(userid);}

    public void deductMoney(User user, int money, Funding funding) {
        Credit credit = Credit.builder()
                .user(user)
                .amount(-money)
                .transactionType(2)
                .funding(funding)
                .build();
        //크레딧에 데이터 삽입
        creditRepository.save(credit); //movieId, credit

    }

    public List<CreditDTO> getUserHistory(int userId) {
        List<Credit> credits = creditRepository.findByUserHistory(userId);
        List<CreditDTO> dtoList = new ArrayList<>();

        for (Credit credit : credits) {
            CreditDTO dto = CreditDTO.toDTO(credit);
            dtoList.add(dto);
        }

        return dtoList;
    }

}
