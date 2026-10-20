export async function getAllMovies() {
  const query = `
    {
      moviesCollection(order: title_ASC) {
        items {
          title
          slug
          year
          genre
          description
          poster {
            url
          }
        }
      }
    }
  `;

  // this is the same query we tested in the GraphQL Playground
  // order: title_ASC sorts the movies A to Z

  const response = await fetch(
    "https://graphql.contentful.com/content/v1/spaces/" + process.env.CONTENTFUL_SPACE_ID,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.CONTENTFUL_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query: query }),
    }
  );

  // sends the query to Contentful's GraphQL API
  // POST because we are sending the query in the body
  // the Authorization header is our read-only delivery token from .env.local
  // this runs on the server, so the token never gets sent to the browser

  const data = await response.json();
  return data.data.moviesCollection.items;

  // turns the answer into something we can use
  // and gives back just the list of movies
}

// export lets other files use this function