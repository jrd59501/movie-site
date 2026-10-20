import Link from "next/link";
import { getAllMovies } from "../../lib/contentful";

const genres = ["Action", "Comedy", "Drama", "Horror", "Sci-Fi"];

// the same 5 genres we locked in Contentful

export default async function MoviesPage({ searchParams }) {
  const { genre } = await searchParams;
  const movies = await getAllMovies(genre);

  // searchParams is the part of the URL after the ?
  // so /movies?genre=Horror gives us "Horror"
  // if there's no genre in the URL, genre is empty and we get all movies

  return (
    <main>
      <h1>Movies</h1>

      <nav>
        <Link href="/movies">All</Link>
        {genres.map((g) => (
          <Link key={g} href={"/movies?genre=" + g}> {g} </Link>
        ))}
      </nav>

      {/* one link for All, then one link for each genre */}

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
}