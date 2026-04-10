// controllers/BookingController.js
const GarageOwner = require("../models/GarageOwnerModel");
const Booking = require("../models/BookingModel");
const Service = require("../models/ServiceModel");
const mongoose = require("mongoose");
const razorpay = require("../utils/razorpay");
const crypto = require("crypto");

// Create booking
exports.createBooking = async (req, res) => {
  try {
    const { userId, serviceId, serviceName, price, bookingDate, garageId } = req.body;

    const booking = await Booking.create({
      userId,
      serviceId,
      garageId,
      serviceName,
      price,
      bookingDate,
      status: "pending", // ✅ FIX
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get bookings by user
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId })
      .populate("userId", "firstName lastName email role")
      .populate("garageId", "garageName city")
      .populate("serviceId", "serviceName price");

    res.status(200).json(bookings);
  } catch (err) {
    console.error("Error fetching user bookings:", err);
    res.status(500).json({ message: err.message });
  }
};


// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId", "firstName lastName email role")
      .populate("garageId", "garageName city")
      .populate("serviceId", "serviceName price");

    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("userId", "firstName lastName email role")
      .populate("garageId", "garageName city")
      .populate("serviceId", "serviceName price");

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    res.status(200).json(booking);
  } catch (err) {
    console.error("Error fetching booking:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    let { status } = req.body;

    // ✅ STEP 1: normalize (small letters)
    status = status.toLowerCase();

    // ✅ STEP 2: validation
    const allowedStatus = ["pending", "completed"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    // ✅ STEP 3: update
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      userId,
      garageId,
      serviceId,
      serviceName,
      price,
      bookingDate,
    } = req.body;

    const booking = await Booking.create({
      userId,
      garageId,
      serviceId,
      serviceName,
      price,
      bookingDate,

      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      paymentStatus: "paid",

      status: "pending", // ✅ ONLY THIS
    });

    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// UPDATE SERVICE STATUS (Owner Complete karega)
// UPDATE SERVICE STATUS (Owner Complete karega)
// exports.updateServiceStatus = async (req, res) => {
//   try {
//     const { serviceStatus } = req.body;
    
//     // Agar serviceStatus "Completed" hai to status bhi "Completed" karo
//     let updateData = { serviceStatus };
//     if (serviceStatus === "Completed") {
//       updateData.status = "Completed";
//     }
    
//     const booking = await Booking.findByIdAndUpdate(
//       req.params.id,
//       updateData,
//       { new: true }
//     );

//     res.status(200).json({ success: true, booking });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// UPDATE BOTH STATUSES (Owner Complete karega)
// exports.updateBookingByOwner = async (req, res) => {
//   try {
//     const { status, serviceStatus } = req.body;
//     const bookingId = req.params.id;
    
//     let updateData = {};
//     if (status !== undefined) updateData.status = status;
//     if (serviceStatus !== undefined) updateData.serviceStatus = serviceStatus;
    
//     const booking = await Booking.findByIdAndUpdate(
//       bookingId,
//       updateData,
//       { new: true }
//     );
    
//     if (!booking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }
    
//     res.status(200).json({ success: true, booking });
//   } catch (err) {
//     console.error("Update error:", err);
//     res.status(500).json({ message: err.message });
//   }
// };