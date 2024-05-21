import "react-quill/dist/quill.snow.css";
import axios from "axios";
import Editor from "../components/Editor.jsx";
import {useEffect, useState} from "react";
import GenreSelect from "../components/GenreSelect.jsx";

const NewMovieProject = () => {
    const [title, setTitle] = useState("");
    const [targetCredit, setTargetCredit] = useState(0);
    const [endDate, setEndDate] = useState("");
    const [genres, setGenres] = useState({});
    const [detail, setDetail] = useState("");
    const [thumbnailImage, setThumbnailImage] = useState("");
    const [posting, setPosting] = useState(false);

    useEffect(() => {
        const movies = axios.get('/api/movies')
    }, []);

    const [isError, setIsError] = useState(false);
    const [errorData, setErrorData] = useState([]);
    const selectThumbnailImage = (e) => {
        e.preventDefault();
        console.log(e.target.files);
        setThumbnailImage(e.target.files[0]);
    }
    const submit = async () => {
        try {
            setPosting(true);
            setIsError(false);
            const formData = new FormData();
            formData.append("title", title);
            formData.append("targetCredit", targetCredit);
            formData.append("endDate", endDate);
            formData.append("genres", genres);
            formData.append("detail", detail);
            formData.append("imageFile", thumbnailImage);

            await axios.post("/api/movies/new", formData, {
                withCredentials: true,
                timeout: 30000,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("성공적으로 등록되었습니다!")
            setPosting(false);
            window.open("/funding", "_self");

        } catch (e) {
            console.log(e);
            if (e.response.status === 400) {
                setIsError(true);
                setPosting(false);

                let err_msg = e.response.data.message;
                let err_data = e.response.data.data;
                if (err_data == null) {
                    err_data = ""
                }

                setErrorData([JSON.stringify(err_msg), JSON.stringify(err_data)])
                console.log(errorData)
            } else alert("오류가 발생하였습니다\n" + JSON.stringify(e.response.data))
        }
    }

    var dt = new Date();
    var today = dt.getFullYear() + '-' + ("0" + (1 + dt.getMonth())).slice(-2) + '-' + ("0" + dt.getDate()).slice(-2);

    return (
        <div className="container mx-auto p-6">
            <p className="text-3xl font-medium my-12 text-center">새로운 펀딩 등록</p>
            <div className="mx-auto max-w-6xl">
                <label className="form-control w-full my-2">
                    <div className="label">
                        <span className="text-lg">프로젝트 제목을 입력해주세요.</span>
                    </div>
                    <input type="text" className="input input-bordered w-full" placeholder="프로젝트 제목"
                           onChange={(e) => setTitle(e.target.value)}/>
                </label>
                <label className="form-control w-full my-2">
                    <div className="label">
                        <span className="text-lg">장르를 선택해주세요.</span>
                    </div>
                    <GenreSelect updateGenre={setGenres}/>
                </label>
                <label className="form-control w-full my-2">
                    <div className="label">
                        <span className="text-lg">목표 금액을 설정해주세요.</span>
                        <span className="label-text-alt">단위: 원</span>
                    </div>
                    <input type="number" placeholder="목표 금액" className="input input-bordered w-full"
                           value={targetCredit}
                           onChange={(e) => setTargetCredit(e.target.value)}/>
                </label>
                <label className="form-control w-full my-2">
                    <div className="label">
                        <span className="text-lg">펀딩 마감 일자</span>
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
                    </div>
                    <div className="text-sm text-gray-500 ms-1 mb-2.5 -mt-2.5">프로젝트의 대표 이미지로 사용됩니다.</div>
                    <input type="file"
                           className="file-input file-input-bordered w-full"
                           accept="image/jpeg,image/png,image/heic,image/heif"
                           onChange={(e) => selectThumbnailImage(e)}/>
                </label>
                <hr className="mt-6"/>
                <label className="form-control w-full my-2">
                    <div className="label">
                        <span className="text-lg">상세내용을 작성해주세요.</span>
                    </div>
                </label>
                <Editor
                    onContentChange={(e) => {
                        setDetail(e)
                    }}
                />

                <div className="mt-12">
                    {isError && (
                        <div role="alert" className="alert alert-warning my-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6"
                                 fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                            </svg>
                            <div>
                                <p className="font-semibold">{errorData[0].replace(/["{}]/g, '').replace(/,/g, '\n')}</p>
                                <p>{errorData[1].replace(/["{}]/g, '')}</p>
                            </div>
                        </div>
                    )}
                    {!posting ?
                        <button className="flex btn btn-primary btn-wide mx-auto text-lg" onClick={submit}>등록</button> :
                        <button className="flex btn btn-primary btn-wide mx-auto text-lg" disabled><span
                            className="loading loading-spinner"></span>처리중
                        </button>
                    }
                </div>
            </div>
        </div>
    );
};
export default NewMovieProject;
