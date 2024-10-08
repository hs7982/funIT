import {axiosDeleteMovie} from "../api/axios.js";

export const deleteMovie = async (movieId) => {
    if (!confirm("정말 해당 프로젝트를 삭제하시겠습니까?\n진행된 펀딩이 존재한다면 해당 펀딩건은 사용자에게 금액이 자동으로 환불처리되며, 복구가 불가능합니다.")) return
    try {
        const response = await axiosDeleteMovie(movieId);
        if (response.status === 200) {
            alert("삭제되었습니다.")
            window.location.reload();
        }
    } catch (e) {
        alert("오류가 발생하였습니다.\n" + e.response.data.message);
    }
}