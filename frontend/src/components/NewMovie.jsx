import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const NewMovie = ({userId}) => {
    const [recentInvestments, setRecentInvestments] = useState([]);

    useEffect(() => {
        const fetchRecentInvestments = async () => {
            try {
                const response = await axios.get(`/api/investments/${userId}`);
                setRecentInvestments(response.data.data);
            } catch (error) {
                console.error('Error fetching recent investments:', error);
            }
        };

        fetchRecentInvestments();
    }, [userId]);

    return (
        <div>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">최근 투자한 영화</h2>
            <div className="flex flex-col space-y-4">
                {recentInvestments.length > 0 ? (
                    recentInvestments.map((investment, index) => (
                        <div key={index} className="p-4 border rounded-lg shadow-lg bg-white flex items-center">
                            <div className="mr-4">
                                <i className="fas fa-film text-indigo-500 text-2xl"></i>
                            </div>
                            <div className="flex-grow">
                                <p className="font-medium text-lg text-gray-800">{investment.movieTitle}</p>
                                <p className="text-gray-500">투자 금액: {investment.amount.toLocaleString()} 크레딧</p>
                                <p className="text-gray-500">투자 날짜: {new Date(investment.date).toLocaleDateString()}</p>
                            </div>
                            <Link to={`/movies/${investment.movieId}`} className="text-indigo-500 hover:underline ml-4">
                                상세보기
                            </Link>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">최근 투자한 영화가 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default NewMovie;