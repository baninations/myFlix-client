import { useState } from "react";
import { MovieCard } from "../movie/movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 0,
      Title: "Silence of the Lambs",
      Description:
        "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
      Genre: {
        Name: "Thriller",
        Description:
          "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience.",
      },
      Director: {
        Name: "Jonathan Demme",
        Bio: "Robert Jonathan Demme was an American director, producer, and screenwriter.",
        Birth: "1944",
        Death: "2017",
      },
      ImagePath:
        "https://upload.wikimedia.org/wikipedia/en/8/86/The_Silence_of_the_Lambs_poster.jpg",
      Featured: true,
    },
    {
      id: 1,
      Title: "21",
      Description:
        "Inspired by real events and people, 21 is about six MIT students who become trained to be experts in card counting in Black Jack and subsequently took Vegas casinos for millions in winnings.",
      Genre: {
        Name: "Crime",
        Description:
          "Crime films, in the broadest sense, is a film genre inspired by and analogous to the crime fiction literary genre.",
      },
      Director: {
        Name: "Robert Luketic",
        Bio: "it is an altered biography of Robert Liketic, He's still a cool director though",
        Birth: 1973,
        Death: null,
      },
      ImagePath:
        "https://upload.wikimedia.org/wikipedia/en/thumb/a/a8/21_%282008_film%29.jpg/220px-21_%282008_film%29.jpg",
      Featured: false,
    },
    {
      id: 2,
      Title: "Serendipity",
      Description:
        "A couple search for each other years after the night they first met, fell in love, and separated, convinced that one day they'd end up together.",
      Genre: {
        Name: "Comedy",
        Description:
          "Comedy is a genre of entertainment that is designed to make audiences laugh.",
      },
      Director: {
        Name: "Peter Chelsom",
        Bio: "Peter Chelsom is a British film director, writer, and actor. He has directed such films as Hector and the Search for Happiness, Serendipity, and Shall We Dance?",
        Birth: 1956,
        Death: null,
      },
      ImagePath:
        "https://upload.wikimedia.org/wikipedia/en/thumb/a/a5/Serendipity_poster.jpg/220px-Serendipity_poster.jpg",
      Featured: true,
    },
    {
      id: 3,
      Title: "Good Will Hunting",
      Description:
        "Good Will Hunting, a janitor at M.I.T., has a gift for mathematics, but needs help from a psychologist to find direction in his life.",
      Genre: {
        Name: "Drama",
        Description:
          "In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.",
      },
      Director: {
        Name: "Gus Van Sant",
        Bio: "Gus Green Van Sant Jr. is an American film director, producer, photographer, and musician. He has earned acclaim as both an independent and mainstream filmmaker.",
        Birth: 1952,
        Death: null,
      },
      ImagePath:
        "https://upload.wikimedia.org/wikipedia/en/thumb/5/52/Good_Will_Hunting.png/220px-Good_Will_Hunting.png",
      Featured: false,
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClicked={() => setSelectedMovie(null)}
      />
    );
  }

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
