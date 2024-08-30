import { useEffect } from "react";
import { MovieContextType, useMovies } from "../../context/MovieContext";
import Movie from "../../components/Movie";
import { Link } from "react-router-dom";

const Favorites = () => {
  const {
    favoriteMovies = [],
    loadFavoriteMovies,
    loadingFavorites,
  } = useMovies() as MovieContextType;

  useEffect(() => {
    loadFavoriteMovies();
  }, []);

  return (
    <div className="w-screen md:p-4 p-2 flex mt-[68px] justify-center ">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-6 place-content-start ">
        {favoriteMovies?.map((movie) => (
          <Movie key={movie._id} movie={movie} />
        ))}

        {favoriteMovies?.length === 0 && !loadingFavorites && (
          <div className="flex items-center justify-center gap-6 h-96 mb-7 w-full flex-col col-span-2 md:col-span-3 lg:col-span-5">
            <span className="font-semibold text-2xl ">
              No Favorite Movies Added
            </span>
            <Link to="/" className="bg-red-600 p-2  rounded">
              Browse Movies
            </Link> 
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
