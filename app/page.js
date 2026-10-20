import Link from "next/link";

export default function HomePage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-24 text-center">
      <h1 className="text-5xl font-bold">Movie Site</h1>
      <p className="mt-4 text-lg text-gray-400">
        A headless CMS demo built with Contentful, GraphQL and Next.js
      </p>
      <Link
        href="/movies"
        className="inline-block mt-8 px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200"
      >
        Browse movies
      </Link>
    </main>
  );
}

// replaces the Next.js welcome page with a simple intro and a button to the movies
