import { useState } from 'react';
import styled from '@emotion/styled';

// 스크롤 동작을 처리하는 커스텀 훅
const useDraggable = () => {
    const [dragging, setDragging] = useState(false);
    const [clickPoint, setClickPoint] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e) => {
        setDragging(true);
        setClickPoint(e.pageX);
        setScrollLeft(e.target.closest('.carousel').scrollLeft);
    };

    const handleMouseMove = (e) => {
        if (!dragging) return;

        e.preventDefault();
        const walk = e.pageX - clickPoint;
        e.target.closest('.carousel').scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
        setDragging(false);
    };

    return {
        handleMouseDown,
        handleMouseMove,
        handleMouseUp
    };
};

// 스타일링된 컴포넌트
const Container = styled.div`
    display: flex;
    overflow-x: scroll;
    max-width: 800px;
    gap: 10px;

    /* 스크롤바 스타일링 */
    scrollbar-width: thin;
    scrollbar-color: #888 transparent;  
    &::-webkit-scrollbar {
        width: 10px;
    }
    &::-webkit-scrollbar-track {
        background: transparent;
    }
    &::-webkit-scrollbar-thumb {
        background: #e89a3e; /* 스크롤바 막대 색상 */
        border: 2px solid #9b6a2f; /* 스크롤바 막대 테두리 설정  */
        border-radius: 12px 12px 12px 12px;
    }
    &::-webkit-scrollbar-thumb:hover {
        background-color: #555;
    }
`;

const MoviePage = () => {
    const { handleMouseDown, handleMouseMove, handleMouseUp } = useDraggable();
    const images = [
        "https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg",
        "https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg",
        "https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg",
        "https://daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg",
        "https://daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg",
        "https://daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg",
        "https://daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg"
    ];

    return (
        <Container
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            {images.map((image, index) => (
                <div key={index} className="carousel-item" onMouseDown={handleMouseDown}>
                    <img src={image} className="rounded-box" style={{ width: '300px', height: 'auto' }} /> {/* 이미지의 크기 조절 */}
                </div>
            ))}
        </Container>
    );
};

export default MoviePage;
