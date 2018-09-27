//import bookApi from "google-books-search";
import { BookModel } from "../../models/"; 
import "isomorphic-fetch";
import BookSchema from "../../schema/BookSchema/BookSchema";

export default{
  findBookbyISBN: (parent, {bookISBN}, context) => {

    if(!bookISBN){
      return null;
    }
  

    return fetch('https://www.googleapis.com/books/v1/volumes?q='+ bookISBN +'+isbn')
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      
      const book = {
        ...myJson.items[0].volumeInfo,
        imageLinks: [myJson.items[0].volumeInfo.imageLinks.smallThumbnail,myJson.items[0].volumeInfo.imageLinks.thumbnail]
      }
      
      return book;
    });
  }
};