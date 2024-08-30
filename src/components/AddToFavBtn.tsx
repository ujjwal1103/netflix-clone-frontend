import { Heart } from "lucide-react";
import { MovieContextType, useMovies } from "../context/MovieContext";

const AddToFavBtn = ({ movieId }: any) => {
  const {
    addFavoriteMovie,
    removeFavoriteMovie,
    favoriteMovies = [],
  } = useMovies() as MovieContextType;

  const isFavorite =
    favoriteMovies &&
    favoriteMovies!.some((favMovie) => favMovie._id === movieId);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavoriteMovie(movieId);
    } else {
      addFavoriteMovie(movieId);
    }
  };

  return (
    <button
      className="bg-white bg-opacity-50 p-2 rounded-full"
      onClick={toggleFavorite}
    >
      {isFavorite ? <Heart fill="red" color="red" /> : <Heart color="black" />}
    </button>
  );
};

export default AddToFavBtn;
