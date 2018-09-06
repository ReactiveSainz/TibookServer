import { PublicationModel, UserModel } from "../../models";

export default {
  createPublication: async (
    parent,
    { bookISBN, type, price, quantity },
    { secret, me }
  ) => {
    const publication = await new PublicationModel({
      bookISBN,
      type,
      price,
      quantity,
      userId: me.id
    });
    await publication.save();
    return publication;
  }
};
