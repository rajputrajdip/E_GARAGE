const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    garageId: { type: mongoose.Schema.Types.ObjectId, ref: "garage", required: true },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },

    serviceName: { type: String, required: true },
    price: { type: Number, required: true },

    paymentId: String,
    orderId: String,

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    // ✅ ONLY ONE STATUS FIELD
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },

    bookingDate: { type: Date, required: true },

    vehicleType: {
      type: String,
      enum: ["two", "four"],
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);