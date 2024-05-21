// InvestPage.jsx

import React, { useState } from "react";

const InvestPage = () => {
    // 투자 금액을 상태로 관리합니다
    const [investmentAmount, setInvestmentAmount] = useState(0);

    // 투자 금액을 변경하는 핸들러 함수
    const handleInvestmentChange = (e) => {
        const amount = parseInt(e.target.value);
        setInvestmentAmount(amount);
    };

    // 투자를 완료하는 함수
    const invest = () => {
        // 최소 입력 금액과 최대 입력 금액을 설정합니다
        const MIN_AMOUNT = 500000;
        const MAX_AMOUNT = 5000000;

        // 입력된 금액이 최소 및 최대 금액 범위 내에 있는지 확인합니다
        if (investmentAmount < MIN_AMOUNT) {
            alert("최소 투자 금액은 500,000원입니다.");
            return;
        } else if (investmentAmount > MAX_AMOUNT) {
            alert("최대 투자 금액은 5,000,000원입니다.");
            return;
        }

        // 확인 메시지를 표시하고 사용자가 확인을 클릭한 경우에만 투자를 완료합니다
        const confirmInvestment = window.confirm(
            `${investmentAmount}원을 투자하시겠습니까?`
        );

        if (confirmInvestment) {
            // 여기에 실제 투자를 완료하는 로직을 추가할 수 있습니다
            alert("투자가 완료되었습니다!");
        }
    };

    return (
        <div className="container p-8">
            <h1 className="text-2xl font-bold mb-4">영화 투자하기</h1>
            <div className="flex items-center mb-4">
                <label htmlFor="investmentAmount" className="mr-2">
                    투자 금액:
                </label>
                <input
                    type="number"
                    id="investmentAmount"
                    className="border rounded p-2"
                    value={investmentAmount}
                    onChange={handleInvestmentChange}
                />
                원
            </div>
            <button className="btn bg-fuchsia-300" onClick={invest}>
                투자하기
            </button>
        </div>
    );
};

export default InvestPage;
