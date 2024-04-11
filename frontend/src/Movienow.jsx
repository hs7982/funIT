const Movienow = () => {
    return (
        <div className="carousel w-full"><font></font>
            <div id="slide1" className="carousel-item relative w-full"><font></font>
                <img src="https://daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg"
                     className="w-full"/><font></font>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <font></font>
                    <a href="#slide4" className="btn btn-circle">❮</a> <font></font>
                    <a href="#slide2" className="btn btn-circle">❯</a><font></font>
                </div>
                <font></font>
            </div>
            <font></font>
            <div id="slide2" className="carousel-item relative w-full"><font></font>
                <img src="https://daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg"
                     className="w-full"/><font></font>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <font></font>
                    <a href="#slide1" className="btn btn-circle">❮</a> <font></font>
                    <a href="#slide3" className="btn btn-circle">❯</a><font></font>
                </div>
                <font></font>
            </div>
            <font></font>
            <div id="slide3" className="carousel-item relative w-full"><font></font>
                <img src="https://daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg"
                     className="w-full"/><font></font>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <font></font>
                    <a href="#slide2" className="btn btn-circle">❮</a> <font></font>
                    <a href="#slide4" className="btn btn-circle">❯</a><font></font>
                </div>
                <font></font>
            </div>
            <font></font>
            <div id="slide4" className="carousel-item relative w-full"><font></font>
                <img src="https://daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg"
                     className="w-full"/><font></font>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <font></font>
                    <a href="#slide3" className="btn btn-circle">❮</a> <font></font>
                    <a href="#slide1" className="btn btn-circle">❯</a><font></font>
                </div>
                <font></font>
            </div>
            <font></font>
        </div>
    );
};
export default Movienow;