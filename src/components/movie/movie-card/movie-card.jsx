import PropTypes, { shape } from "prop-types";

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

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Director: shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string,
      Birth: PropTypes.number,
      Genre: shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string,
      }),
      ImagePath: PropTypes.string.isRequired,
    }),
  }).isRequired,
  onMovieClicked: PropTypes.func.isRequired,
};
