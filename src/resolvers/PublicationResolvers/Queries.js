import { PublicationModel } from "../../models/";
import { BookModel } from "../../models/";

export default {
  publications: async (parent, args, context) => await PublicationModel.find()
};
