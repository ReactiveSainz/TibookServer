import mongoose, { Schema } from "mongoose";

const PublicationSchema = new mongoose.Schema({
  bookISBN: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  type: {
    type: String,
    enum: ["Rent", "Exchange", "Sell"],
    default: "Sell",
    required: true
  },
  price: {
    type: Number,
    required: true,
    default: 0
  }
});

const Publication = mongoose.model("Publication", PublicationSchema);

export default Publication;
