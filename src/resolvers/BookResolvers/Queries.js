//import bookApi from "google-books-search";
import { BookModel } from "../../models/";
import BookSchema from "../../schema/BookSchema/BookSchema";
import "isomorphic-fetch";

export default {
  findBookbyISBN: (parent, { bookISBN }, context) => {
    if (!bookISBN) {
      return null;
    }

    return fetch(
      "https://www.googleapis.com/books/v1/volumes?q=" + bookISBN + "+isbn"
    )
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        let thumbnails = [];
        if (myJson.items[0].volumeInfo.imageLinks)
          Object.values(myJson.items[0].volumeInfo.imageLinks).map(key =>
            thumbnails.push(key)
          );

        const book = {
          ...myJson.items[0].volumeInfo,
          ...(thumbnails.length >= 1
            ? { imageLinks: thumbnails }
            : { imageLinks: ["pruebaimagen"] })
        };

        return book;
      });
  },
  findBooks: async (parent, { bookISBN }, context) => {
    if (!bookISBN) {
      return null;
    }

    return fetch(
      "https://www.googleapis.com/books/v1/volumes?q=" + bookISBN + "+isbn"
    )
      .then(res => res.json())
      .then(function(myJson) {
        if (!myJson.items) return [];
        const books = myJson.items.map(item => {
          let thumbnails = [];
          if (item.volumeInfo.imageLinks)
            Object.values(item.volumeInfo.imageLinks).map(key =>
              thumbnails.push(key)
            );

          return {
            id: item.id,
            ...item.volumeInfo,
            ...(thumbnails.length >= 1
              ? { imageLinks: thumbnails }
              : { imageLinks: [] })
          };
        });

        return books;
      });
  }
};
