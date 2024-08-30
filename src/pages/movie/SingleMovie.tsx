import { useCallback, useEffect, useState } from "react";
import { IMovie } from "../../context/MovieContext";
import { request } from "../../config/api.config";
import { useParams } from "react-router-dom";
import AddToFavBtn from "../../components/AddToFavBtn";
import { Play } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const SingleMovie = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<IMovie | null>(null);
  const { isAuthenticated } = useAuth();

  const getMovie = useCallback(async () => {
    try {
      const res = await request.get(`/movies/movie/${movieId}`);
      setMovie(res.data);
    } catch (error) {
      console.error("Error fetching movie:", error);
    }
  }, [movieId]);

  useEffect(() => {
    getMovie();
  }, [getMovie]);

  if (!movie) {
    return (
      <div className="p-4 mt-[68px]">
        <div className="flex gap-10">
          <div className="w-64 rounded-xl animate-pulse  h-96 bg-zinc-950"></div>
          <div>
            <div className="w-96 rounded-xl animate-pulse  h-20 bg-zinc-950" />

            <div className="w-20 h-7 rounded-xl bg-zinc-950 mt-2" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen  mt-[68px]  flex flex-col items-center  text-white p-4">
      <div className="w-full flex flex-col md:flex-row gap-10 flex-1">
        <img
          src={movie.big_image}
          alt={movie.title}
          className=" h-96 w-auto rounded-lg shadow-lg object-contain"
        />
        <div className="mt-6">
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <p className="text-xl text-gray-400 mt-2">{movie.year}</p>
          <div className="flex items-center mt-2">
            {movie.genre.map((genre) => (
              <span
                key={genre}
                className="bg-gray-700 text-white rounded-full px-3 py-1 text-sm font-semibold mr-2"
              >
                {genre}
              </span>
            ))}
          </div>
          <p className="mt-4 text-lg leading-relaxed">{movie.description}</p>
          <div className="mt-6 flex  items-center">
            <span className="bg-white h-10 bg-opacity-50 p-2 rounded-full">
              <Play color="black" />
            </span>
            {isAuthenticated && (
              <span className=" rounded-full px-3 py-1 text-lg font-semibold mr-2">
                <AddToFavBtn movieId={movie?._id} />
              </span>
            )}
          </div>
          <div className="mt-6">
            <a
              href={movie.imdb_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out"
            >
              View on IMDb
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleMovie;
