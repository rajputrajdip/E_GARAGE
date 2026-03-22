import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "../components/Login";
import Signup from "../components/SignUp";
import { UserNavbar } from "../components/user/UserNavbar";
import Home from "../components/user/Home";
import Garages from "../components/user/Garages";
import Services from "../components/user/Services";
import Booking from "../components/user/Booking";
import MyBookings from "../components/user/MyBookings";

// Router Configuration
const router = createBrowserRouter([


  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
 

  // User Routes
  {
    path: "/",
    element: <UserNavbar />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "garages", element: <Garages /> },
    { path: "garage/:id", element: <Services /> },
    { path: "booking", element: <Booking /> },
    {
  path: "user/bookings",
  element: <MyBookings />
}
    ],
  },

  // 👉 You can add Garage Owner routes here later
]);

// App Router Component
const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;