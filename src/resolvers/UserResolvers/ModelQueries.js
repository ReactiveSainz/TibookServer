import { PublicationModel, AddressModel } from "../../models/";
export default {
  publications: async User => {
    return await PublicationModel.find({ userId: User.id });
  },
  addresses: async User => {
    return await AddressModel.find({ userId: User.id });
  }
};
