import { useEffect } from "react";

import MovieSliders from "../../components/MovieSliders";
import Hero from "../../components/Hero";
import { MovieContextType, useMovies } from "../../context/MovieContext";
import LoadingSkeleton from "../../components/LoadingSkeleton";

const Home = () => {
  const {
    loadMovies,
    movies = [],
    loadFavoriteMovies,
    loadingMovies,
  } = useMovies() as MovieContextType;

  useEffect(() => {
    loadMovies();
    loadFavoriteMovies();
  }, []);

  const filterMoviesByGenre = (genre: string) =>
    movies?.filter((movie) => movie.genre.includes(genre));

  if (loadingMovies) {
    return (
      <>
        <LoadingSkeleton />
        <LoadingSkeleton />
      </>
    );
  }

  return (
    <div className="w-screen relative">
      <Hero />
      <div className="w-full z-10 relative md:-top-32 -top-24">
        <MovieSliders movies={movies?.slice(0, 10)} title="Top 10 Movies" />
      </div>
      <div className="w-full z-10 relative md:-top-32 -top-24">
        <MovieSliders
          movies={filterMoviesByGenre("Action")}
          title="Action Movies"
        />
        <MovieSliders
          movies={movies?.filter(
            (movie) =>
              movie.genre.includes("Crime") && movie.genre.includes("Drama")
          )}
          title="Crime And Drama"
        />
        <MovieSliders
          movies={filterMoviesByGenre("Comedy")}
          title="Best Comedy Movies For You"
        />
      </div>
    </div>
  );
};

export default Home;
