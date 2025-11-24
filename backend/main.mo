import Text "mo:base/Text";
import List "mo:base/List";
import Array "mo:base/Array";

actor Teddy {

  public type Movie = {
    title : Text;
    genre : Text;
    era : Text;
    vibe : Text;
  };

  public type FilterCriteria = {
    genre : Text;
    era : Text;
    vibe : Text;
  };

  let movies : [Movie] = [
    // Horror Movies
    {
      title = "The Shining";
      genre = "Horror";
      era = "80s";
      vibe = "Scary";
    },
    {
      title = "Get Out";
      genre = "Horror";
      era = "2010s";
      vibe = "Mind-bending";
    },
    {
      title = "Scream";
      genre = "Horror";
      era = "90s";
      vibe = "Scary";
    },
    {
      title = "Hereditary";
      genre = "Horror";
      era = "2010s";
      vibe = "Intense";
    },
    // Comedy Movies
    {
      title = "Superbad";
      genre = "Comedy";
      era = "2000s";
      vibe = "Funny";
    },
    {
      title = "The Hangover";
      genre = "Comedy";
      era = "2000s";
      vibe = "Funny";
    },
    {
      title = "Bridesmaids";
      genre = "Comedy";
      era = "2010s";
      vibe = "Feel-good";
    },
    {
      title = "Dumb and Dumber";
      genre = "Comedy";
      era = "90s";
      vibe = "Funny";
    },
    // Action Movies
    {
      title = "Die Hard";
      genre = "Action";
      era = "80s";
      vibe = "Intense";
    },
    {
      title = "Mad Max: Fury Road";
      genre = "Action";
      era = "2010s";
      vibe = "Intense";
    },
    {
      title = "John Wick";
      genre = "Action";
      era = "2010s";
      vibe = "Intense";
    },
    {
      title = "Terminator 2";
      genre = "Action";
      era = "90s";
      vibe = "Intense";
    },
    // Drama Movies
    {
      title = "The Shawshank Redemption";
      genre = "Drama";
      era = "90s";
      vibe = "Feel-good";
    },
    {
      title = "Forrest Gump";
      genre = "Drama";
      era = "90s";
      vibe = "Feel-good";
    },
    {
      title = "The Godfather";
      genre = "Drama";
      era = "70s";
      vibe = "Intense";
    },
    {
      title = "Fight Club";
      genre = "Drama";
      era = "90s";
      vibe = "Mind-bending";
    },
    // Romance Movies
    {
      title = "The Notebook";
      genre = "Romance";
      era = "2000s";
      vibe = "Romantic";
    },
    {
      title = "Titanic";
      genre = "Romance";
      era = "90s";
      vibe = "Romantic";
    },
    {
      title = "La La Land";
      genre = "Romance";
      era = "2010s";
      vibe = "Romantic";
    },
    {
      title = "Pretty Woman";
      genre = "Romance";
      era = "90s";
      vibe = "Romantic";
    },
    // Thriller Movies
    {
      title = "Se7en";
      genre = "Thriller";
      era = "90s";
      vibe = "Intense";
    },
    {
      title = "Inception";
      genre = "Thriller";
      era = "2010s";
      vibe = "Mind-bending";
    },
    {
      title = "The Silence of the Lambs";
      genre = "Thriller";
      era = "90s";
      vibe = "Intense";
    },
    {
      title = "Gone Girl";
      genre = "Thriller";
      era = "2010s";
      vibe = "Mind-bending";
    },
    // Sci-Fi Movies
    {
      title = "The Matrix";
      genre = "Sci-Fi";
      era = "90s";
      vibe = "Mind-bending";
    },
    {
      title = "Blade Runner";
      genre = "Sci-Fi";
      era = "80s";
      vibe = "Mind-bending";
    },
    {
      title = "Interstellar";
      genre = "Sci-Fi";
      era = "2010s";
      vibe = "Mind-bending";
    },
    {
      title = "Back to the Future";
      genre = "Sci-Fi";
      era = "80s";
      vibe = "Feel-good";
    },
  ];

  func matchesCriteria(movie : Movie, criteria : FilterCriteria) : Bool {
    let genreMatch = Text.equal(movie.genre, criteria.genre);
    let eraMatch = Text.equal(movie.era, criteria.era);
    let vibeMatch = Text.equal(movie.vibe, criteria.vibe);

    genreMatch or eraMatch or vibeMatch;
  };

  public query func getFilteredMovies(criteria : FilterCriteria) : async [Movie] {
    let filtered = Array.filter<Movie>(
      movies,
      func(movie) {
        matchesCriteria(movie, criteria);
      },
    );

    let filteredList = List.fromArray(filtered);
    let first16 = List.take(filteredList, 16);
    List.toArray(first16);
  };

  public query func getAllGenres() : async [Text] {
    ["Horror", "Comedy", "Action", "Drama", "Romance", "Thriller", "Sci-Fi"];
  };

  public query func getAllEras() : async [Text] {
    ["70s", "80s", "90s", "2000s", "2010s", "2020s"];
  };

  public query func getAllVibes() : async [Text] {
    ["Scary", "Feel-good", "Intense", "Romantic", "Funny", "Mind-bending"];
  };
};
