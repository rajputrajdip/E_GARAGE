// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { Login } from "../components/Login";
// import Signup from "../components/SignUp";
// import { UserNavbar } from "../components/user/UserNavbar";
// import Home from "../components/user/Home";
// import Garages from "../components/user/Garages";
// import Booking from "../components/user/Booking";
// import MyBookings from "../components/user/MyBookings";
// import BookingDetails from "../components/user/BookingDetails";
// import Services from "../components/user/Services"; // ✅ IMPORTANT

// import { AdminNavbar } from "../components/admin/AdminNavbar";
// import Dashboard from "../components/admin/Dashboard";
// import Users from "../components/admin/Users";
// import GaragesAdmin from "../components/admin/Garages";

// import { PrivateRoute } from "./PrivateRoute";
// import GarageOwnerDashboard from "../components/garageowner/GarageOwnerDashboard";

// const router = createBrowserRouter([
//   // Public Routes
//   { path: "/login", element: <Login /> },
//   { path: "/signup", element: <Signup /> },

//   // ✅ USER ROUTES
//   {
//     path: "/",
//     element: (
//       <PrivateRoute role="user">
//         <UserNavbar />
//       </PrivateRoute>
//     ),
//     children: [
//       { index: true, element: <Home /> },
//       { path: "home", element: <Home /> },
//       { path: "garages", element: <Garages /> },

//       // 🔥 THIS WAS MISSING (MAIN FIX)
//       { path: "garage/:id", element: <Services /> },

//       { path: "booking", element: <Booking /> },
//       { path: "user/bookings", element: <MyBookings /> },
//       { path: "booking/:id", element: <BookingDetails /> },
//     ],
//   },

//   // Owner
//   { path: "/owner/dashboard", element: <GarageOwnerDashboard /> },

//   //✅ ADMIN ROUTES
//   {
//     path: "/admin",
//     element: (
//       <PrivateRoute role="admin">
//         <AdminNavbar />
//       </PrivateRoute>
//     ),
//     children: [
//       { index: true, element: <Dashboard /> },
//       { path: "dashboard", element: <Dashboard /> },
//       { path: "users", element: <Users /> },
//       { path: "garages", element: <GaragesAdmin /> },

//     ],
//   },



// ]);

// const AppRouter = () => <RouterProvider router={router} />;

// export default AppRouter;





import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "../components/Login";
import Signup from "../components/SignUp";

// USER
import { UserNavbar } from "../components/user/UserNavbar";
import Home from "../components/user/Home";
import Garages from "../components/user/Garages";
import Booking from "../components/user/Booking";
import MyBookings from "../components/user/MyBookings";
import BookingDetails from "../components/user/BookingDetails";
import Services from "../components/user/Services";
import Profile from "../components/user/Profile"; // ✅ NEW

// ADMIN
import AdminLayout from "../components/admin/AdminLayout"; // ✅ NEW
import Dashboard from "../components/admin/Dashboard";
import UsersAdmin from "../components/admin/UsersAdmin";
import GaragesAdmin from "../components/admin/GaragesAdmin";
import BookingsAdmin from "../components/admin/BookingsAdmin"; // ✅ NEW
import ServicesAdmin from "../components/admin/ServicesAdmin"; // ✅ NEW

// OWNER
import GarageOwnerDashboard from "../components/garageowner/GarageOwnerDashboard";

// AUTH
import { PrivateRoute } from "./PrivateRoute";

const router = createBrowserRouter([
  // 🌐 PUBLIC
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },

  // 👤 USER ROUTES
  {
    path: "/",
    element: (
      <PrivateRoute role="user">
        <UserNavbar />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "garages", element: <Garages /> },
      { path: "garage/:id", element: <Services /> },
      { path: "booking", element: <Booking /> },
      { path: "user/bookings", element: <MyBookings /> },
      { path: "booking/:id", element: <BookingDetails /> },
      { path: "profile", element: <Profile /> }, 
    ],
  },

  // 🏢 GARAGE OWNER
  {
    path: "/owner",
    element: (
      <PrivateRoute role="owner">
        <GarageOwnerDashboard />
      </PrivateRoute>
    ),
    children: [
      { path: "dashboard", element: <GarageOwnerDashboard /> },
    ],
  },

  // 🛠️ ADMIN ROUTES (UPDATED 🔥)
  {
    path: "/admin",
    element: (
      <PrivateRoute role="admin">
        <AdminLayout /> {/* ✅ Sidebar Layout */}
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "users", element: <UsersAdmin /> },
      { path: "garages", element: <GaragesAdmin /> },
      { path: "bookings", element: <BookingsAdmin /> }, // ✅ NEW
      { path: "services", element: <ServicesAdmin /> }, // ✅ NEW
    ],
  },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;