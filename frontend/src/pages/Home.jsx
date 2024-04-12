import Moviebox from "../components/Moviebox.jsx";
import {useEffect} from "react";
import axios from "axios";


const Home = () => {
    useEffect(() => {
        const movies = axios.get('/api/movies')
        console.log(movies)
    }, []);

    return (
        <div className="container mx-auto p-6">
            <p className="text-3xl font-medium my-8">진행중인 펀딩</p>
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
