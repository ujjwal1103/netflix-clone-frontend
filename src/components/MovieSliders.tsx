import Movie from "./Movie";

const MovieSlider = ({ movies, title }: any) => {
  return (
    <div className="relative w-full overflow-hidden p-3">
      <div>
        <h1 className="px-3 text-2xl font-semibold drop-shadow-md text-white">{title}</h1>
      </div>

      <div className="flex transition-transform overflow-x-scroll gap-3 py-5 px-3 duration-300 scrollbar-none">
        {movies?.map((movie: any) => (
          <Movie movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieSlider;
