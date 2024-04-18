const SignUp = () => {
    return (
        <div className="container m-auto p-4">
            <div className="card mx-auto shrink-0 w-full max-w-2xl shadow-2xl bg-slate-100">
                <form className="card-body">
                    <div className="text-center text-3xl font-semibold my-4">회원가입</div>
                    <div className="relative">
                        <input type="text" id="floating_filled"
                               className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                               placeholder=" " required/>
                        <label htmlFor="floating_filled"
                               className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">이름</label>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">비밀번호</span>
                        </label>
                        <input type="password" placeholder="비밀번호" className="input input-bordered" required/>
                    </div>
                    <div className="flex justify-between">
                        <div/>
                        <button className=" btn btn-sm">구</button>
                        <button className="btn btn-sm">카</button>
                        <button className="btn btn-sm">네</button>
                        <div/>
                    </div>
                    <div className="form-control mt-3">
                        <button className="btn text-lg btn-primary">로그인</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default SignUp;
