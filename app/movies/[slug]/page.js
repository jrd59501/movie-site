import Link from "next/link";
import { getMovieBySlug } from "../../../lib/contentful";

export default async function MoviePage({ params }) {
  const { slug } = await params;
  const movie = await getMovieBySlug(slug);

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <Link href="/movies" className="text-gray-400 hover:text-white">
        &larr; Back to movies
      </Link>

      <div className="mt-6 flex flex-col md:flex-row gap-8">
        <img
          src={movie.poster.url}
          alt={movie.title}
          className="w-full md:w-72 rounded-lg"
        />

        <div>
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <p className="mt-2 text-gray-400">
            {movie.year} | {movie.genre}
          </p>
          <p className="mt-6 leading-relaxed text-gray-200">{movie.description}</p>
        </div>
      </div>
    </main>
  );
}

// &larr; is a left arrow for the back link
// flex-col stacks the poster on top of the text on phones
// md:flex-row puts them side by side on bigger screens