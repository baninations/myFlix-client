export const MovieCard = ({ movie, onMovieClicked }) => {
  return (
    <div
      onClick={() => {
        onMovieClicked(movie);
      }}
    >
      {movie.Title}
    </div>
  );
};
