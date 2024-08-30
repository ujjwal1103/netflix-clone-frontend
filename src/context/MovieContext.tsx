import React, {
  createContext,
  ReactNode,
  useContext,
} from "react";
import { request } from "../config/api.config";
import { useAuth } from "./AuthContext";
import { useFetch } from "../hooks/useFetch";

export interface IMovie {
  _id: string;
  rank: number;
  title: string;
  description: string;
  image: string;
  big_image: string;
  genre: string[];
  thumbnail: string;
  rating: string;
  year: number;
  imdbid: string;
  imdb_link: string;
}

export interface MovieContextType {
  movies: IMovie[] | null;
  favoriteMovies: IMovie[] | null;
  loadMovies: () => void;
  loadFavoriteMovies: () => void;
  addFavoriteMovie: (movieId: string) => Promise<void>;
  removeFavoriteMovie: (movieId: string) => Promise<void>;
  loadingMovies: boolean;
  loadingFavorites: boolean;
  errorMovies: string | null;
  errorFavorites: string | null;
}

export const MovieContext = createContext<MovieContextType | undefined>(
  undefined
);

export const MovieProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();

  const {
    data: movies,
    loading: loadingMovies,
    error: errorMovies,
    refetch: loadMovies,
  } = useFetch<IMovie[]>(() => request.get("/movies").then((res) => res.data));

  const {
    data: favoriteMovies,
    loading: loadingFavorites,
    error: errorFavorites,
    refetch: loadFavoriteMovies,
  } = useFetch<IMovie[]>(() =>
    isAuthenticated
      ? request.get("/favorites").then((res) => res.data)
      : Promise.resolve([])
  );

  const addFavoriteMovie = async (movieId: string) => {
    try {
      await request.post(`/favorites/${movieId}`);
      loadFavoriteMovies();
    } catch (error) {
      console.error("Failed to add movie to favorites:", error);
    }
  };

  const removeFavoriteMovie = async (movieId: string) => {
    try {
      await request.delete(`/favorites/${movieId}`);
      loadFavoriteMovies();
    } catch (error) {
      console.error("Failed to remove movie from favorites:", error);
    }
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        favoriteMovies,
        loadMovies,
        loadFavoriteMovies,
        addFavoriteMovie,
        removeFavoriteMovie,
        loadingMovies,
        loadingFavorites,
        errorFavorites,
        errorMovies,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => useContext(MovieContext);
