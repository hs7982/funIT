import React, {useEffect} from "react";
import axios from "axios";

const Home = () => {
    useEffect(() => {
    }, []);

    return (
        <div className="container mx-auto p-6">
            <p className="text-3xl font-medium my-8">메인</p>
            <hr style={{paddingBottom: '35px'}}/>
            <div className="flex flex-wrap justify-evenly gap-8">
            </div>
        </div>
    );
};
export default Home;
