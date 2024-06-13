import {Link, useNavigate} from "react-router-dom";
import {axiosDeleteComment, axiosGetCommentByMovie, axiosPostComment} from "../api/axios.js";
import {useEffect, useState} from "react";
import {useRecoilValue} from "recoil";
import {IsLoginState, UserState} from "../recoil/RecoilState.js";

const MovieComment = ({movieId}) => {
    const isLogin = useRecoilValue(IsLoginState);
    const user = useRecoilValue(UserState);
    const [comments, setComments] = useState([]);
    const [inputComment, setInputComment] = useState("");

    const postComment = async () => {
        if (inputComment === "") {
            alert("내용을 입력하세요.")
            return
        }
        const data = {
            movie: {
                id: movieId
            },
            content: inputComment
        }
        try {
            const response = await axiosPostComment(data);
            if (response.status === 201) {
                fetchComments();
                setInputComment("");
            }
        } catch (e) {
            alert("오류가 발생하였습니다.\n" + e.response.data.message);
        }
    }

    const fetchComments = async () => {
        try {
            const response = await axiosGetCommentByMovie(movieId);
            if (response.status === 200) {
                setComments(response.data.data);
            }
        } catch (error) {
            console.error(error)
            alert("댓글을 가져오는 중 오류가 발생하였습니다.")
        }

    }

    const deleteComment = async (id) => {
        if (!confirm("댓글을 삭제하시겠습니까?")) return
        try {
            const response = await axiosDeleteComment(id);
            if (response.status === 200) {
                fetchComments()
            }
        } catch (error) {
            if (error.code === "ERR_BAD_REQUEST") {
                alert(error.response.data.message);
            } else {
                console.error(error)
                alert("댓글을 삭제하는 중 오류가 발생하였습니다.")
            }
        }


    }

    useEffect(() => {
        fetchComments();
    }, []);


    return (
        <>
            <div className="w-full">
                {
                    comments.length === 0 ? <div>작성된 댓글이 없습니다!</div> :
                        <>
                            {comments.map(comment => (
                                <div key={comment.id} className="chat chat-start">
                                    <div className="chat-image avatar">
                                        <div className="w-10 rounded-full">
                                            <img src={comment.user.profileImage} alt="프로필사진"/>
                                        </div>
                                    </div>
                                    <div className="chat-header">{comment.user.name}
                                        {comment.user.id === user.id &&
                                            <span role="button" className="ms-2 text-red-800"
                                                  onClick={() => deleteComment(comment.id)}>X</span>}</div>
                                    <div className="chat-bubble">{comment.content}</div>
                                </div>
                            ))}
                        </>
                }
            </div>
            <div>
                {isLogin ?
                    <div className="flex mt-4">
                        <input type="text" className="input input-bordered grow me-2" placeholder="작성할 댓글을 입력하세요."
                               onChange={(e) => setInputComment(e.target.value)}
                               value={inputComment}/>
                        <button className="btn btn-primary" onClick={postComment}>등록</button>
                    </div> :
                    <div className="flex mt-4">
                        <input type="text" className="input input-bordered grow me-2"
                               placeholder="로그인하여 댓글을 작성해 보세요!" disabled/>
                        <button className="btn btn-disabled">등록</button>
                    </div>

                }

            </div>
        </>);
};

export default MovieComment;
