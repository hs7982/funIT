import "react-quill/dist/quill.snow.css";
import axios from "axios";
import Editor from "../Editor.jsx";
import {useEffect, useState} from "react";
import GenreSelect from "../components/GenreSelect.jsx";

const NewMovieProject = () => {
    const [title, setTitle] = useState("");
    const [targetCredit, setTargetCredit] = useState("");
    const [endDate, setEndDate] = useState("");
    const [detail, setDetail] = useState("");
    useEffect(() => {
        const movies = axios.get('/api/movies')
        console.log(movies)
    }, []);


    const submit = async () => {
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("targetCredit", targetCredit);
            formData.append("endDate", endDate);
            formData.append("detail", detail);

            await axios.post("/api/movies/new", formData, {
                withCredentials: true,
                timeout: 30000,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        } catch (e) {
            console.log(e);
        }
    }

    var dt = new Date();
    var today = dt.getFullYear() + '-' + ("0" + (1 + dt.getMonth())).slice(-2) + '-' + ("0" + dt.getDate()).slice(-2);

    return (
        <div className="container mx-auto p-6">
            <p className="text-3xl font-medium my-8 ">새로운 펀딩 등록</p>
            <div className="mx-auto max-w-3xl">
                <label className="form-control w-full my-2">
                    <div className="label">
                        <span className="text-lg">제목</span>
                        <span className="label-text-alt">Top Right label</span>
                    </div>
                    <input type="text" placeholder="프로젝트명을 입력해주세요." className="input input-bordered w-full"
                           onChange={(e) => setTitle(e.target.value)}/>
                </label>
                <label className="form-control w-full my-2">
                    <div className="label">
                        <span className="text-lg">장르</span>
                    </div>
                    <GenreSelect/>
                </label>
                <label className="form-control w-full my-2">
                    <div className="label">
                        <span className="text-lg">목표 금액</span>
                        <span className="label-text-alt">Top Right label</span>
                    </div>
                    <input type="number" placeholder="설정할 목표 금액을 입력해주세요." className="input input-bordered w-full"
                           onChange={(e) => setTargetCredit(e.target.value)}/>
                </label>
                <label className="form-control w-full my-2">
                    <div className="label">
                        <span className="text-lg">펀딩 마감 일자</span>
                        <span className="label-text-alt">Top Right label</span>
                    </div>
                    <input type="datetime-local"
                           className="input input-bordered w-full"
                           min={today + " 00:00:00"}
                           onChange={(e) => {
                               setEndDate(e.target.value + ":00")
                           }}/>
                </label>
                <label className="form-control w-full my-2">
                    <div className="label">
                        <span className="text-lg">썸네일 이미지</span>
                        <span className="label-text-alt">Top Right label</span>
                    </div>
                    <input type="file"
                           className="file-input file-input-bordered w-full"
                           accept="image/jpeg,image/png,image/heic,image/heif"/>
                </label>
                <label className="form-control w-full my-2">
                    <div className="label">
                        <span className="text-lg">상세내용</span>
                        <span className="label-text-alt">Top Right label</span>
                    </div>
                </label>
                <Editor
                    onContentChange={(e) => {
                        setDetail(e)
                    }}
                />
                <button className="btn btn-primary btn-wide mt-14 mx-auto" onClick={submit}>등록</button>
            </div>


        </div>
    );
};
export default NewMovieProject;
