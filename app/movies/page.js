import Link from "next/link";
import { getAllMovies } from "../../lib/contentful";

const genres = ["Action", "Comedy", "Drama", "Horror", "Sci-Fi"];

export default async function MoviesPage({ searchParams }) {
  const { genre } = await searchParams;
  const movies = await getAllMovies(genre);

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-6">Movies</h1>

      <nav className="flex flex-wrap gap-2 mb-8">
        <Link
          href="/movies"
          className={!genre ? "px-4 py-2 rounded-full bg-white text-black text-sm" : "px-4 py-2 rounded-full bg-gray-800 hover:bg-gray-700 text-sm"}
        >
          All
        </Link>

        {genres.map((g) => (
          <Link
            key={g}
            href={"/movies?genre=" + g}
            className={genre === g ? "px-4 py-2 rounded-full bg-white text-black text-sm" : "px-4 py-2 rounded-full bg-gray-800 hover:bg-gray-700 text-sm"}
          >
            {g}
          </Link>
        ))}
      </nav>

      {/* the genre links are rounded buttons */}
      {/* the one you picked turns white so you know which filter is on */}
      {/* ? : means if this is true use the first style, if not use the second */}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <Link key={movie.slug} href={"/movies/" + movie.slug} className="group">
            <img
              src={movie.poster.url}
              alt={movie.title}
              className="w-full rounded-lg group-hover:opacity-80 transition"
            />
            <h2 className="mt-2 font-semibold">{movie.title}</h2>
            <p className="text-sm text-gray-400">
              {movie.year} | {movie.genre}
            </p>
          </Link>
        ))}
      </div>

      {/* grid shows the movies as cards, 2 across on phones and up to 5 on big screens */}
      {/* the whole card is a link now, not just the title */}
      {/* group-hover fades the poster a little when you hover the card */}
    </main>
  );
}