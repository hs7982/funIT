const Error = (error) => {
    return (
        <div className="container p-6">
            <div className="flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="w-12 h-12 mx-2 my-auto text-red-600">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"/>
                </svg>
                <h1 className="text-red-600">오류가 발생하였습니다!</h1>
            </div>
            <div className="text-2xl font-medium my-6">{error.message}</div>
        </div>
    );
};
export default Error;
