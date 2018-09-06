import mongoose, { Schema } from "mongoose";

const CreditCardSchema = new mongoose.Schema({
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  stripeId: {
    type: String,
    required: true
  }
});

const CreditCard = mongoose.model("CreditCard", CreditCardSchema);

export default CreditCard;
