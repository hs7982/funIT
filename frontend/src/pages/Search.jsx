import Moviebox from "../components/Moviebox.jsx";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useLocation} from "react-router-dom";


const Search = () => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [movies, setMovies] = useState([]);
    const location = useLocation();


    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const keyword = queryParams.get('keyword');

        console.log(keyword)

        if (keyword) {
            setSearchKeyword(keyword);
        }
    }, [location.search]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                if(searchKeyword!==''){
                    const response = await axios.get('/api/movies/search?keyword=' + searchKeyword);
                    setMovies(response.data.data)
                    console.log(response);
                }

            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };
        fetchMovies();
    }, [searchKeyword]);



    const enterHandler = (e) => {
        if (e.keyCode === 13) {
            // enterHandler 함수 내부에서 setSearchKeyword를 호출하여 검색어를 설정
            setSearchKeyword(e.target.value);
        }
    };

    // const executeSearch = () => {
    //     if (searchKeyword.trim() !== '') {
    //         // 검색어가 비어 있지 않을 경우 검색 실행
    //         history.push(`/search?keyword=${encodeURIComponent(searchKeyword)}`);
    //     }
    // };

    // const handleInputChange = (event) => {
    //     setSearchKeyword(event.target.value); // 입력값이 변경될 때마다 검색어 상태 업데이트
    // };
    //
    // const handleKeyPress = (event) => {
    //     if (event.key === 'Enter') {
    //         executeSearch();
    //     }
    // };


    return (
        <div className="container mx-auto p-6">
            <div className="flex">
                <div className="text-3xl font-medium my-8">검색</div>
            </div>
            <hr style={{paddingBottom: '35px'}}/>

            {movies.length > 0 ? ( // 검색 결과가 있을 경우
                <div className="flex flex-wrap justify-evenly gap-8">
                    {movies.map(movie => (
                        <Moviebox key={movie.id} movie={movie}/>
                    ))}
                </div>):<div>검색 결과가 없습니다.</div>}
        </div>
    );
};

export default Search;
