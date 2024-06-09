package com.funit.backend.credit;

import com.funit.backend.credit.domain.Credit;
import com.funit.backend.credit.domain.CreditRepository;
import com.funit.backend.funding.domain.Funding;
import com.funit.backend.user.domain.User;
import com.funit.backend.utils.mapper.CreditMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CreditService {
    @Autowired
    CreditRepository creditRepository;

    public List<Credit> getAllCredits() {
        return creditRepository.findAll();
    }

    public int getUserCredit(int userid) {
        return creditRepository.findTotalCreditUserId(userid);
    }

    /**
     * 크레딧을 차감하기 위한 메소드
     *
     * @param user
     * @param money
     * @param funding
     */
    public void deduct(User user, int money, Funding funding) {
        Credit credit = Credit.builder()
                .user(user)
                .amount(-money)
                .transactionType(2)
                .funding(funding)
                .build();
        //크레딧에 데이터 삽입
        creditRepository.save(credit); //movieId, credit

    }

    /**
     * 크레딧을 지급하기 위한 메소드
     *
     * @param user
     * @param money
     * @param funding
     */
    public void additional(User user, int money, Funding funding) {
        Credit credit = Credit.builder()
                .user(user)
                .amount(money)
                .transactionType(1)
                .funding(funding)
                .build();
        //크레딧에 데이터 삽입
        creditRepository.save(credit); //movieId, credit

    }

    /**
     * 크레딧을 환불을 위해 다시 지급 하기위한 메소드
     *
     * @param user
     * @param money
     * @param funding
     */
    public void refund(User user, int money, Funding funding) {
        Credit credit = Credit.builder()
                .user(user)
                .amount(money)
                .transactionType(3)
                .funding(funding)
                .build();
        //크레딧에 데이터 삽입
        creditRepository.save(credit); //movieId, credit
    }

    public User getUserByFundingId(int fundingId) {
        return creditRepository.getUserByFundingId(fundingId);
    }

    public List<CreditDTO> getCreditByFundingId(int fundingId) {
        List<Credit> credits = creditRepository.findByFundingId(fundingId);
        return CreditMapper.INSTANCE.toCreditDTO(credits);
    }

    public List<CreditDTO> getUserHistory(int userId) {
        List<Credit> credits = creditRepository.findByUserHistory(userId);
        return CreditMapper.INSTANCE.toCreditDTO(credits);
    }

}
