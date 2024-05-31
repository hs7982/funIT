const Error = (error) => {
    return (
        <div className="container p-6">
            <div className="flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="w-9 h-9 mx-2 my-auto text-red-600">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"/>
                </svg>
                <div className="text-red-600 text-3xl font-medium">오류가 발생하였습니다!</div>
            </div>
            <div>
                <div className="text-2xl font-medium my-6">{error.message}</div>
                <div className="flex justify-center">
                    <button className="btn" onClick={() => window.location.reload()}>페이지 다시 로드</button>
                </div>
            </div>

        </div>
    );
};
export default Error;
