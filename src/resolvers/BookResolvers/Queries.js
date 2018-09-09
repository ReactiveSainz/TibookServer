import bookApi from "google-books-search";

const options = {
  key: process.env.GOOGLE_KEY,
  field: "isbn",
  offset: 0,
  limit: 10,
  type: "books",
  order: "relevance",
  lang: "es"
};

/* books.search("Professional JavaScript for Web Developers", options, function(error, results, apiResponse) {
    if ( ! error ) {
        console.log(results);
    } else {
        console.log(error);
    }
}); */
