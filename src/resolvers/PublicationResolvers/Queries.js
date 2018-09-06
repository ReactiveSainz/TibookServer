import { PublicationModel } from "../../models/";

export default {
  publications: async (parent, args, context) => await PublicationModel.find()
};
