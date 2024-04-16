import Moviebox from "../components/Moviebox.jsx";
import {useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom";


const Home = () => {
    useEffect(() => {
        const movies = axios.get('/api/movies')
    }, []);

    return (
        <div className="container mx-auto p-6">
            <div className="flex">
                <div className="text-3xl font-medium my-8">진행중인 펀딩</div>
                <Link to="/movies" className="my-auto ms-auto me-0">
                    <button className="btn btn-primary">더보기</button>
                </Link>
            </div>
            <div className="flex flex-wrap justify-evenly gap-8">
                <Moviebox/>
                <Moviebox/>
                <Moviebox/>
                <Moviebox/>
                <Moviebox/>
                <Moviebox/>
            </div>
        </div>
    );
};
export default Home;
