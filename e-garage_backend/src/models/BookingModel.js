const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    garageId: { type: mongoose.Schema.Types.ObjectId, ref: "garage", required: true },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
    serviceName: { type: String, required: true },
    price: { type: Number, required: true },

    // ✅ NEW PAYMENT FIELDS
    paymentId: String,
    orderId: String,
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },

    // Booking Status
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
      default: "Pending",
    },

    serviceStatus: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
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