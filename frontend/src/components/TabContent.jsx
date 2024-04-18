import PropTypes from 'prop-types';

const TabContent = ({ activeTab }) => {
    return (
        <div className="tab-content">
            {activeTab === "모집현황" && (
                <div>
                    <h3>모집 금액 현황</h3>
                    <p>현재 400,550,000원 모집</p>
                    <p>총 416명이 이 콘텐츠에 투자했어요.</p>
                </div>
            )}
            {activeTab === "갤러리" && (
                <div>
                    {/* 갤러리에 대한 내용을 여기에 추가 */}
                    갤러리 탭 내용
                </div>
            )}
            {activeTab === "상세내용" && (
                <div>
                    {/* 상세내용에 대한 내용을 여기에 추가 */}
                    상세내용 탭 내용
                </div>
            )}
            {activeTab === "일정" && (
                <div>
                    {/* 일정에 대한 내용을 여기에 추가 */}
                    일정 탭 내용
                </div>
            )}
        </div>
    );
};

TabContent.propTypes = {
    activeTab: PropTypes.string.isRequired // 'activeTab' prop의 유형을 문자열로 정의하고 필수 요소임을 명시
};


export default TabContent;
