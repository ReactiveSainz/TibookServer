import "isomorphic-fetch";

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

      let thumbnails =[]
      if(myJson.items[0].volumeInfo.imageLinks)
          Object.values(myJson.items[0].volumeInfo.imageLinks).map(key=>thumbnails.push(key))
      
      const book = {
        ...myJson.items[0].volumeInfo,
        ...(thumbnails.length>=1 ? {imageLinks : thumbnails} : {imageLinks:["pruebaimagen"]})
      }
            
      return book;
    });
  }
};