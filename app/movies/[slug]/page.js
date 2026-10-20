import { getMovieBySlug } from "../../../lib/contentful";

// ../../../ goes up three folders: out of [slug], out of movies, out of app

export default async function MoviePage({ params }) {
  const { slug } = await params;
  const movie = await getMovieBySlug(slug);

  // params has the part of the URL that matches [slug]
  // so /movies/inception gives us "inception"
  // then we ask Contentful for that one movie

  return (
    <main>
      <img src={movie.poster.url} alt={movie.title} width="300" />
      <h1>{movie.title}</h1>
      <p>{movie.year} | {movie.genre}</p>
      <p>{movie.description}</p>
    </main>
  );
}