const fs = require("fs");
require("dotenv").config({ path: ".env.local" });

// fs is the file system, built into node.js, so we can make movies.json
// dotenv reads our .env.local file so the script can use the keys without typing them in the code

const apiKey = process.env.TMDB_API_KEY;

// grabs the TMDB key from .env.local

const genres = [
  { tmdbId: 28, ourGenre: "Action" },
  { tmdbId: 35, ourGenre: "Comedy" },
  { tmdbId: 18, ourGenre: "Drama" },
  { tmdbId: 27, ourGenre: "Horror" },
  { tmdbId: 878, ourGenre: "Sci-Fi" },
];

// array of the genres we want
// tmdbId is the number TMDB uses for that genre and ourGenre is the name we use in Contentful

const moviesPerGenre = 4;

// how many movies we grab from each genre
// 5 genres x 4 movies = 20 movies

function makeSlug(title) {
  let slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return slug;
}

// same slug function from the recipe script
// "The Dark Knight" turns into "the-dark-knight"

async function main() {
  const movies = [];
  const usedSlugs = [];

  // movies holds all the finished movies
  // usedSlugs keeps track of what we already grabbed so we don't add the same movie twice

  for (const genre of genres) {
    const response = await fetch(
      "https://api.themoviedb.org/3/discover/movie?api_key=" + apiKey +
      "&with_genres=" + genre.tmdbId +
      "&sort_by=vote_count.desc"
    );
    const data = await response.json();

    // goes through each genre one at a time
    // asks TMDB for movies in that genre, sorted by most votes so we get well known movies
    // await waits for the answer and .json() turns it into something we can use

    let count = 0;

    // counts how many movies we added for this genre

    for (const result of data.results) {
      if (count === moviesPerGenre) {
        break;
      }

      const slug = makeSlug(result.title);

      if (usedSlugs.includes(slug)) {
        continue;
      }

      // break stops the loop once we have 4 movies
      // if we already used this slug, continue skips it and goes to the next movie

      const movie = {
        title: result.title,
        slug: slug,
        posterUrl: "https://image.tmdb.org/t/p/w500" + result.poster_path,
        year: Number(result.release_date.slice(0, 4)),
        genre: genre.ourGenre,
        description: result.overview,
      };

      // builds one movie that matches our fields in Contentful
      // TMDB only gives the end of the poster link so we add the start of it
      // release_date looks like "2008-07-16" so slice(0, 4) keeps "2008" and Number makes it a number

      movies.push(movie);
      usedSlugs.push(slug);
      count++;
      console.log("Got: " + movie.title + " (" + movie.genre + ")");

      // adds the movie to the list, remembers its slug, adds 1 to the count
      // prints it in the terminal so we can see it working
    }
  }

  const jsonText = JSON.stringify(movies, null, 2);
  fs.writeFileSync("movies.json", jsonText);
  console.log("Saved " + movies.length + " movies to movies.json");

  // turns the list into text and saves it to movies.json
  // the null, 2 just spaces it out so it's easy to read
}

main();

// starts the program