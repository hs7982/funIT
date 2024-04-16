import Moviebox from "../components/Moviebox.jsx";
import {useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom";


const MoviesList = () => {
    useEffect(() => {
        const movies = axios.get('/api/movies')
    }, []);

    return (
        <div className="container mx-auto p-6">
            <div className="flex">
                <div className="text-3xl font-medium my-8">전체 펀딩 목록</div>
                <Link to="/funding/new" className="my-auto ms-auto me-0">
                    <button className="btn btn-primary">등록하기</button>
                </Link>
            </div>
            <div className="flex flex-wrap justify-evenly gap-8">

            </div>
        </div>
    );
};
export default MoviesList;
