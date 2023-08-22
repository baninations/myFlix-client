import { useEffect, useState } from "react";
import { MovieCard } from "../movie/movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://movies-flix-al-f68cdd84f041.herokuapp.com/movies")
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
  }, []);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClicked={() => setSelectedMovie(null)}
      />
    );
  }
  console.log("SetMovies 2222: ", setMovies);

  if (movies.length === 0) {
    return <div>The list is empty</div>;
  }
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClicked={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
