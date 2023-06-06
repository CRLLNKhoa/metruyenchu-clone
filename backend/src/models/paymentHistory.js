const mongoose = require("mongoose");

const paymentHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    pack: {type: Number, required: true},
    amount: {type: Number, required: true},
  },
  {
    timestamps: true,
  }
);

const PaymentHistory = mongoose.model("PaymentHistory", paymentHistorySchema);
module.exports = PaymentHistory;
