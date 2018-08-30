import { UserModel } from "../../models/";

export default {
  me: async (parent, args, { me }) => {
    if (!me) {
      return null;
    }
    const user = await UserModel.findById(me.id);
    return user;
  },
  users: async (parent, args, context) => await UserModel.find(),
  userByName: async (parent, { name }, context) =>
    await UserModel.find({ name: new RegExp(name, "i") })
};
