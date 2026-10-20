const contentful = require("contentful-management");
require("dotenv").config({ path: ".env.local" });
const movies = require("../movies.json");

// contentful-management is the package that lets code add and change content in Contentful
// dotenv loads our keys from .env.local
// movies is the list we saved from TMDB, ../ means go up one folder to find it

const client = contentful.createClient(
  { accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN },
  {
    defaults: {
      spaceId: process.env.CONTENTFUL_SPACE_ID,
      environmentId: "master",
    },
  }
);

// connects to Contentful with the management token, which can write content
// defaults tells it which space and environment to use so we don't have to repeat it every time

async function main() {
  for (const movie of movies) {
    let poster = await client.asset.create(
      {},
      {
        fields: {
          title: { "en-US": movie.title },
          file: {
            "en-US": {
              contentType: "image/jpeg",
              fileName: movie.slug + ".jpg",
              upload: movie.posterUrl,
            },
          },
        },
      }
    );

    // goes through each movie one at a time
    // creates the poster as an asset (images and files are assets in Contentful)
    // upload is the TMDB link, Contentful grabs the image from there
    // "en-US" is the language, Contentful saves every field per language

    poster = await client.asset.processForAllLocales({}, poster);
    poster = await client.asset.publish({ assetId: poster.sys.id }, poster);

    // processing is Contentful downloading and saving the image
    // then we publish it so the website can see it

    const entry = await client.entry.create(
      { contentTypeId: "movies" },
      {
        fields: {
          title: { "en-US": movie.title },
          slug: { "en-US": movie.slug },
          poster: {
            "en-US": {
              sys: { type: "Link", linkType: "Asset", id: poster.sys.id },
            },
          },
          year: { "en-US": movie.year },
          genre: { "en-US": movie.genre },
          description: { "en-US": movie.description },
        },
      }
    );

    // creates the movie entry using our Movie content type
    // each field matches a field we made in the content model
    // poster is a link to the asset we just made, not the image itself

    await client.entry.publish({ entryId: entry.sys.id }, entry);
    console.log("Imported: " + movie.title);

    // publishes the entry so it shows up on the site
    // prints it so we can see it working
  }

  console.log("Done, all movies imported");
}

main();

// starts the program