import "./movie-card.scss";
import PropTypes, { shape } from "prop-types";
import { Card, Button } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClicked }) => {
  return (
    <Card className="card h-100" onClick={() => onMovieClicked(movie)}>
      <Card.Img className="imageSize" src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director.Name}</Card.Text>
        <Button onClick={() => onMovieClicked(movie)} variant="link">
          Open
        </Button>
      </Card.Body>
    </Card>
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
