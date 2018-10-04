import mongoose, { Schema } from "mongoose";

const CreditCardSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  stripeCardId: {
    type: String,
    required: true
  }
});

const CreditCard = mongoose.model("CreditCard", CreditCardSchema);

export default CreditCard;
