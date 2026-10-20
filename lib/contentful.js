export async function getAllMovies(genre) {
  const where = {};

  if (genre) {
    where.genre = genre;
  }

  // where holds our filters
  // if a genre was picked, we add it, if not, where stays empty and we get every movie

  const query = `
    query ($where: MoviesFilter) {
      moviesCollection(where: $where, order: title_ASC) {
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

  // MoviesFilter is the type Contentful made for filtering our movies content type
  // we pass the filters in as a variable, same safe way as the slug page

  const response = await fetch(
    "https://graphql.contentful.com/content/v1/spaces/" + process.env.CONTENTFUL_SPACE_ID,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.CONTENTFUL_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query: query, variables: { where: where } }),
    }
  );

  const data = await response.json();
  return data.data.moviesCollection.items;
}