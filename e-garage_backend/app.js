const express = require("express");
const app = express();
const cors = require("cors");

// ENV
require("dotenv").config();

// Middleware
app.use(express.json());
app.use(cors());

// DB Connection
const DBconnection = require("./src/utils/DBconnection");
DBconnection();

// Routes
app.use("/user", require("./src/routes/UserRoutes"));
app.use("/garage", require("./src/routes/GarageRoutes"));
app.use("/service", require("./src/routes/ServiceRoutes"));
app.use("/booking", require("./src/routes/BookingRoutes"));



const garageRoutes = require("./src/routes/GarageOwnerRoutes");
app.use("/garage", garageRoutes);

const garageownerRoutes = require("./src/routes/GarageOwnerRoutes");
app.use("/garageowner", garageownerRoutes);

// PORT FIXED
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});