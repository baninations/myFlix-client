import PropTypes, { shape } from "prop-types";
import "./movie-view.scss";

export const MovieView = ({ movie, onBackClicked }) => {
  return (
    <div>
      <div>
        <img src={movie.ImagePath} alt="Movie poster" />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.Genre.Name}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director.Name}</span>
      </div>
      <button className="back-button" onClick={onBackClicked}>
        Back
      </button>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.number,
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
  onBackClicked: PropTypes.func.isRequired,
};
