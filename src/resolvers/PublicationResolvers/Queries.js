import { PublicationModel } from "../../models/";

export default {
  publications: async (parent, args, context) => await PublicationModel.find(),
  publicationsByType: (parent, {bookType}, context) => {
    var arr;
    var resultPublication = PublicationModel.find({type:bookType}, (err,publications) =>{
      
      if(err) console.log(err)
      
      publications.map( publication => {
        arr = publication
        console.log(publication)
      })
    })

    console.log(arr);

    return resultPublication;
  }
};
