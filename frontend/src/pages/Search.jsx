import Moviebox from "../components/Moviebox.jsx";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useLocation} from "react-router-dom";
import {axiosSearchMovie} from "../api/axios.js";


const Search = () => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [movies, setMovies] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);


    useEffect(() => {
        const keyword = queryParams.get('keyword');
        setSearchKeyword(keyword);
    }, [location.search]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                if (searchKeyword !== '') {
                    const response = await axiosSearchMovie(searchKeyword);
                    setMovies(response.data.data)
                } else setMovies('');

            } catch (error) {
                console.error(error);
            }
        };
        fetchMovies();
    }, [searchKeyword]);

    return (
        <div className="container mx-auto p-6">
            <div className="flex">
                <div className="text-3xl font-medium my-8">검색</div>
            </div>
            <hr style={{paddingBottom: '35px'}}/>
            {searchKeyword === '' ? (
                <div>검색어를 입력하세요.</div>
            ) : (
                movies.length > 0 ? ( // 검색 결과가 있을 경우
                    <div className="flex flex-wrap justify-evenly gap-8">
                        {movies.map(movie => (
                            <Moviebox key={movie.id} movie={movie}/>
                        ))}
                    </div>
                ) : (
                    <div>
                        <p className="font-semibold text-3xl mb-2">" {searchKeyword} "</p>
                        <p>검색 결과가 없습니다.</p>
                    </div>
                )
            )}
        </div>
    );
};

export default Search;
