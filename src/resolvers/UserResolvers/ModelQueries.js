import { PublicationModel } from "../../models/";
export default {
  publications: async User => {
    return await PublicationModel.find({ userId: User.id });
  }
};
