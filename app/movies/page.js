import Link from "next/link";
import { getAllMovies } from "../../lib/contentful";

// Link lets us go to another page without reloading the whole site
// brings in the function from lib/contentful.js

export default async function MoviesPage() {
  const movies = await getAllMovies();

  // gets the movies from Contentful before the page shows

  return (
    <main>
      <h1>Movies</h1>

      {movies.map((movie) => (
        <div key={movie.slug}>
          <img src={movie.poster.url} alt={movie.title} width="200" />
          <h2>
            <Link href={"/movies/" + movie.slug}>{movie.title}</Link>
          </h2>
          <p>{movie.year} | {movie.genre}</p>
        </div>
      ))}
    </main>
  );

  // .map goes through each movie and makes HTML for it
  // the Link sends you to /movies/ plus that movie's slug, like /movies/inception
}