import { getAllMovies } from "../../lib/contentful";

// brings in the function from lib/contentful.js
// ../../ goes up two folders, out of movies and out of app

export default async function MoviesPage() {
  const movies = await getAllMovies();

  // gets the movies from Contentful before the page shows
  // async/await works here because this is a server component

  return (
    <main>
      <h1>Movies</h1>

      {movies.map((movie) => (
        <div key={movie.slug}>
          <img src={movie.poster.url} alt={movie.title} width="200" />
          <h2>{movie.title}</h2>
          <p>{movie.year} | {movie.genre}</p>
        </div>
      ))}
    </main>
  );

  // .map goes through each movie and makes HTML for it
  // key helps React keep track of each movie, slug works because it's unique
}