import { PublicationModel } from "../../models/"; 
import { BookModel } from "../../models/"; 
import "isomorphic-fetch";

export default {
  publications: async (parent, args, context) => await PublicationModel.find()
};
