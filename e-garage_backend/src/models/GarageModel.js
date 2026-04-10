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
    image: { type: String, default: "" },

   garageOwnerId: {
  type: mongoose.Schema.Types.ObjectId, // jab bhi tum mongodb me objectid store karte ho uska matlab hai ki yaha kisi dusre document ki ID store hogi, aur uska reference dena zaruri hota hai ki ye kis collection se belong karti hai. Isliye hum ref use karte hain.
  ref: "User", // ✅ KEEP THIS
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