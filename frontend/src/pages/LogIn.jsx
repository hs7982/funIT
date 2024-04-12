const LogIn = () => {
    return (
        <div className="container m-auto p-4">
            <div className="card mx-auto shrink-0 w-full max-w-lg shadow-2xl bg-slate-100">
                <form className="card-body">
                    <div className="text-center text-3xl font-semibold my-4">로그인</div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">이메일</span>
                        </label>
                        <input type="email" placeholder="이메일" className="input input-bordered" required/>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">비밀번호</span>
                        </label>
                        <input type="password" placeholder="비밀번호" className="input input-bordered" required/>
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">비밀번호를 잊어버렸다면?</a>
                        </label>
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
    );
};
export default LogIn;
