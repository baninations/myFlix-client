import { useEffect, useState } from "react";
import { MovieCard } from "../movie/movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Row, Col, Container } from "react-bootstrap";
import { NavigationBar } from "../navigation-view/navigation-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  useEffect(() => {
    if (!token) return;

    fetch("https://movies-flix-al-f68cdd84f041.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie._id,
            Title: movie.Title,
            Director: movie.Director,
            Description: movie.Description,
            Genre: movie.Genre,
            ImagePath: movie.ImagePath,
          };
        });
        setMovies(moviesFromApi);
        console.log("set movies:", setMovies(moviesFromApi));
        console.log(data);
      });
  }, [token]);

  return (
    <Container>
      <NavigationBar user={user} />
      <Row className="justify-content-md-center mt-4">
        {!user ? (
          <Col md={5}>
            <LoginView
              onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
              }}
            />
            or
            <SignupView />
          </Col>
        ) : selectedMovie ? (
          <Col md={8}>
            <MovieView
              movie={selectedMovie}
              onBackClicked={() => setSelectedMovie(null)}
            />
          </Col>
        ) : movies.length === 0 ? (
          <div>The list is empty.</div>
        ) : (
          <>
            {movies.map((movie) => (
              <Col
                className="mb-5 mt-4"
                key={movie.id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
              >
                <MovieCard
                  movie={movie}
                  onMovieClicked={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                  }}
                />
              </Col>
            ))}
          </>
        )}
      </Row>
    </Container>
  );
};
