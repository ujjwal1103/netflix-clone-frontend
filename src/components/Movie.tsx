import { Play } from "lucide-react";
import AddToFavBtn from "./AddToFavBtn";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Movie = ({ movie }: any) => {
  const { isAuthenticated } = useAuth();
  return (
    <div
      key={movie._id}
      className="relative flex-shrink-0 w-44 h-64 overflow-hidden rounded-lg transform transition-transform duration-300 hover:scale-105"
    >
      <img
        src={movie.image}
        alt={movie.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <div className="text-white text-center space-y-2">
          <h3 className="text-lg font-bold">{movie.title}</h3>
          <div className="flex justify-center space-x-4">
            <Link
              to={`/movie/${movie._id}`}
              className="bg-white bg-opacity-50 p-2 rounded-full"
            >
              <Play color="black" />
            </Link>
            {isAuthenticated && <AddToFavBtn movieId={movie._id} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
