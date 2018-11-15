import { PublicationModel } from "../../models/";

export default {
  publications: async (parent, args, context) => await PublicationModel.find(),
  publicationsByType: async (parent, {bookType}, context) => await PublicationModel.find({type:bookType}, (err, data) => {
      
    data.map(publication => {
      publication.set('thumbnail','test2', String,{strict: false});
      publication.set('thumbnail3',"test3", String,{strict: false});
      
      return publication;
    });
      
    data.forEach( test => console.log("===================\n", test) )
  })
//   .aggregate( [
//     {
//       $addFields: { thumbnail:
//         { $add: [ "$totalHomework", "$totalQuiz", "$extraCredit" ] } }
//     }
//  ] )
};
