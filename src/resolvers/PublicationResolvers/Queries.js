import { PublicationModel } from "../../models/";

export default {
  publications: async (parent, args, context) => await PublicationModel.find(),
  publicationsByType: async(parent, {bookType}, context) => await PublicationModel.find({type:bookType})
};
