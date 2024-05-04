import {Link} from "react-router-dom";

const Moviebox = ({movie}) => {

    return (
        <div className="" key={movie.id}>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure>
                    <img
                        src={movie.thumbnailImage}
                        alt={movie.title}
                        style={{width: "100%", height: "100%"}}/>
                </figure>
                <div className="p-4">
                    <h2 className="card-title">
                        {movie.title}
                        <div className="badge badge-secondary">NEW</div>
                        <div className="grow"></div>
                        {movie.genres.slice(0, 1).map(genre => (
                            <div key={genre.id} className="badge badge-outline">{genre.name}</div>
                        ))}
                        {movie.genres.length > 1 && (
                            <div className="badge bg-gray-100 text-sm">+{movie.genres.length - 1}</div>
                        )}
                    </h2>
                    <p></p>
                    <div className="pt-2 card-actions justify-end">
                        <div className="pt-1 flex-1">110% 달성</div>
                        <Link to={"/funding/detail/" + movie.id}>
                            <button className="btn btn-sm bg-fuchsia-300">투자하기</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Moviebox;
