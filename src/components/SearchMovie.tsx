import { useState, useEffect } from "react";
import { request } from "../config/api.config";
import useDebounce from "../hooks/useDebounce";
import { IMovie } from "../context/MovieContext";
import { Loader } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const SearchMovie = () => {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debouncedSearch = useDebounce(search, 500);
  const location = useLocation();

  useEffect(() => {
    setSearch("");
    setMovies([]);
  }, [location]);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!debouncedSearch) {
        setMovies([]);
        setError(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await request.get(
          `/movies/search?search=${debouncedSearch}`
        );
        setMovies(response.data);
      } catch (error) {
        setError("Failed to fetch movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [debouncedSearch]);

  return (
    <div className="w-full max-w-md mx-auto relative">
      <div className="text-sm flex gap-2 items-center md:w-72 w-44 bg-black">
        <input
          value={search}
          type="text"
          placeholder="Search movies..."
          className="w-full px-3 py-2 rounded focus:outline-none bg-transparent"
          onChange={(e) => setSearch(e.target.value)}
        />
        {loading && <Loader className="animate-spin mr-3" />}
      </div>

      {error && <p className="space-y-2 px-2 absolute py-2 mt-3 text-red-500 bg-zinc-950 w-96">{error}</p>}

      {!loading && !error && movies.length === 0 && debouncedSearch && (
        <p className="space-y-2 absolute px-2 py-2 mt-3 bg-zinc-950 w-96">
          No movies found.
        </p>
      )}

      {movies.length > 0 && (
        <ul className="space-y-2 absolute py-2 mt-3 -left-8 bg-zinc-950 md:w-96 w-64 max-h-96 overflow-y-scroll">
          {movies.slice(0, 19).map((movie) => (
            <li
              key={movie._id}
              className="p-2 cursor-pointer rounded hover:bg-zinc-800"
            >
              <Link to={`/movie/${movie._id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchMovie;
