// const mongoose = require("mongoose");

// const garageSchema = new mongoose.Schema({
//   garageName: {
//     type: String,
//     required: true,
//   },
//   city: {
//     type: String,
//   },
//   address: {
//     type: String,
//   },
//   image: {
//     type: String,
//   },
//   garageOwnerId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "garageOwner",
//   }
// }, { timestamps: true });

// module.exports = mongoose.model("garage", garageSchema);






const mongoose = require("mongoose");

const garageSchema = new mongoose.Schema(
  {
    garageName: { type: String, required: true },
    city: { type: String },
    address: { type: String },
    image: { type: String },

    garageOwnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "garageOwner",
    },

    // 🔥 NEW: Approval System
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true } // ✅ CORRECT PLACE
);

module.exports = mongoose.model("garage", garageSchema);