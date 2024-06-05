import {Link, useNavigate} from "react-router-dom";

const Moviebox = ({movie}) => {
    const navigate = useNavigate();

    const calcPer = (target, total) => {
        return Math.floor((total / target) * 100);
    }

    const calcDay = (endDate) => {
        const today = new Date();
        const date = new Date(endDate);
        const timeGap = date - today;
        const dayGap = Math.ceil(timeGap / (1000 * 60 * 60 * 24));
        return dayGap < 0 ? -1 : dayGap;
    }

    const isEnded = movie.status === 2;

    return (
        <div onClick={() => navigate("/funding/detail/" + movie.id)}>
            <div className="cursor-pointer" id={"movie-" + movie.id} key={movie.id}>
                <div
                    className="card w-[28rem] h-[25rem] max-w-[100vw] bg-base-100 shadow-2xl transform transition-transform duration-300 hover:scale-105">
                    <figure className={`bg-cover w-full h-full`}
                            style={{backgroundImage: `url(${movie.thumbnailImage})`}}>
                        <div
                            className={`flex justify-center backdrop-filter backdrop-blur-lg bg-white bg-opacity-20 w-full h-full`}>
                            <img
                                src={movie.thumbnailImage}
                                alt={movie.title}
                                className="object-contain max-h-full"
                            />
                        </div>
                    </figure>
                    <div className="p-4">
                        <h2 className="card-title">
                            <div className="flex-auto truncate ...">
                                {movie.title}
                            </div>
                            {movie.genres.slice(0, 1).map(genre => (
                                <div key={genre.id} className="badge badge-outline shrink-0">{genre.name}</div>
                            ))}
                            {movie.genres.length > 1 && (
                                <div
                                    className="badge bg-gray-100 px-[0.4rem] text-sm shrink-0">+{movie.genres.length - 1}</div>
                            )}
                        </h2>
                        <div className="pt-2 card-actions justify-end">
                            <div className="pt-1 flex-1">
                                {isEnded
                                    ? `모집종료 | ${calcPer(movie.targetCredit, movie.totalFunding)}% 달성`
                                    : `D-${calcDay(movie.endDate)} | ${calcPer(movie.targetCredit, movie.totalFunding)}% 달성`}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Moviebox;
