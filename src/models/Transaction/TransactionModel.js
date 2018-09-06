import mongoose, { Schema } from "mongoose";

const TransactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  /* charges:{
    type:Array,
    required:true
  }, */
  total: {
    type: Number,
    required: true
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  buyerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  stripeChargeId: {
    type: String,
    required: true
  },
  paymentType: {
    type: String,
    enum: ["creditCard", "other"],
    default: "other"
  },
  created: Date,
  finalized: Date
});

const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;
