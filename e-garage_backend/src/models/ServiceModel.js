const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  serviceName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
  garageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "garage",
  }
}, { timestamps: true });

// module.exports = mongoose.model("service", serviceSchema);
module.exports = mongoose.model("Service", serviceSchema);