import React, { useState, useEffect } from "react";
import Moviebox from "../components/Moviebox.jsx";
import axios from "axios";
import {Link} from "react-router-dom";

const MovieProject = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('/api/movies');
                setMovies(response.data.data);
                console.log(movies);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div className="container mx-auto p-6">
            <div className="flex">
            <div className="text-3xl font-medium my-8">진행중인 펀딩</div>
            <Link className="me-0 ms-auto my-auto" to="/funding/new">
                <button className="btn btn-m bg-fuchsia-300 rounded-full" style={{ fontSize: '20px' }}>프로젝트 생성</button>
            </Link>
            </div>
            <hr style={{paddingBottom: '35px'}}/>
            <div className="flex flex-wrap justify-evenly gap-8">
                {movies.map(movie => (
                    <Moviebox movie={movie}/>
                ))}
            </div>
        </div>
    );
};

export default MovieProject;
