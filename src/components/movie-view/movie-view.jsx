import PropTypes, { shape } from "prop-types";
import "./movie-view.scss";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import { Row } from "react-bootstrap";

export const MovieView = ({ movie, onBackClicked }) => {
  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col xs="12" md="6" lg="4" className="text-center">
          <Image src={movie.ImagePath} thumbnail />
        </Col>
      </Row>
      <Row>
        <Col>
          <p>
            <strong>Title:</strong> {movie.Title}
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>
            <strong>Description:</strong> {movie.Description}
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>
            <strong>Genre:</strong> {movie.Genre.Name}
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>
            <strong>Director:</strong> {movie.Director.Name}
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <button className="back-button" onClick={onBackClicked}>
            Back
          </button>
        </Col>
      </Row>
    </Container>
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
