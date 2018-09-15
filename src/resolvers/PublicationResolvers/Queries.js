import { PublicationModel } from "../../models/";
import "isomorphic-fetch";

export default {
  publications: async (parent, args, context) => await PublicationModel.find(),
  findBookbyISBN: async(parent, {bookISBN}, context) =>{ 
    
    console.log(bookISBN);
    if(!bookISBN){
      return null;
    }

    const response = async () =>{
      const result =  await fetch('https://www.googleapis.com/books/v1/volumes?q='+ bookISBN +'+isbn');
      const jsonResult = await result.json();
      console.log(jsonResult);
    }; 
    console.log("===================");
    
    console.log(response());

    return JSON.stringify(response.title);
  }
};
