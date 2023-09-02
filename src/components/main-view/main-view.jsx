import { useEffect, useState } from "react";
import { MovieCard } from "../movie/movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Row, Col, Container, Nav } from "react-bootstrap";
import { BrowserRouter } from "react-router-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import "./main-view.scss";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  console.log("stored User: ", storedUser);
  console.log("stored Token: ", storedToken);
  console.log("User: ", user);

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
      });
  }, [token]);

  const hanldeLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);

    return <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={hanldeLogout} />
      <Row className="justify-content-md-center mt-4">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user) => setUser(user)} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col
                        className="mb-4 container"
                        key={movie.id}
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                      >
                        <MovieCard
                          movie={movie}
                          user={user}
                          method={"POST"}
                          messageOK={"Movie added"}
                          messageFailed={"Failed to add movie"}
                          fav={"Add to fav"}
                        />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <ProfileView
                user={user}
                onLoggedOut={hanldeLogout}
                movies={movies}
              />
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};

// (
//   <Container>
//     <NavigationBar user={user} />
//     <Row className="justify-content-md-center mt-4">
//       {!user ? (
//         <Col md={5}>
//           <LoginView
//             onLoggedIn={(user, token) => {
//               setUser(user);
//               setToken(token);
//             }}
//           />
//           or
//           <SignupView />
//         </Col>
//       ) : selectedMovie ? (
//         <Col md={8}>
//           <MovieView
//             movie={selectedMovie}
//             onBackClicked={() => setSelectedMovie(null)}
//           />
//         </Col>
//       ) : movies.length === 0 ? (
//         <div>The list is empty.</div>
//       ) : (
//         <>
//           {movies.map((movie) => (
//             <Col
//               className="mb-5 mt-4"
//               key={movie.id}
//               xs={12}
//               sm={6}
//               md={4}
//               lg={3}
//             >
//               <MovieCard
//                 movie={movie}
//                 onMovieClicked={(newSelectedMovie) => {
//                   setSelectedMovie(newSelectedMovie);
//                 }}
//               />
//             </Col>
//           ))}
//         </>
//       )}
//     </Row>
//   </Container>
// );
