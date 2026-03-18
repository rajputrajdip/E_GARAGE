import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "../components/Login";
import  Signup  from "../components/SignUp";
import { UserNavbar } from "../components/user/UserNavbar";
import { AdminSidebar } from "../components/admin/AdminSidebar";
import { AllUserList } from "../components/admin/AllUserList";
import Home from "../components/user/Home";
import Dashboard from "../components/user/Dashboard";
import Booking from "../components/user/Bookings";
import Profile from "../components/user/Profile";
import Setting from "../components/user/Setting";
import { Outlet } from "react-router-dom";
import Logout from "../components/user/Logout";
import GarageOwner from "../components/garageowner/GarageOwner";
import { AllGarageList } from "../components/admin/AllGarageList";
import { AllBookingList } from "../components/admin/AllBookingList";  
import { AllPaymentList } from "../components/admin/AllPaymentList";


const router = createBrowserRouter([
    {path:"/login",element:<Login/>},

  

    {path:"/signup",element:<Signup/>},


 
   {
  path: "/",
  element: <UserNavbar />,
  children: [
    { index: true, element: <Home /> },
    { path: "home", element: <Home /> },
    { path: "user/dashboard", element: <Dashboard /> },
    {path:"user/bookings", element:<Booking/>},
    {path:"user/profile", element:<Profile/>},
    {path:"user/setting", element:<Setting/>},
    {path:"user/logout", element:<Logout/>}
   
  ]
},

    
       { path:'/admin', 
        element:<AdminSidebar/>,
        children:[
              { path: "users", element: <AllUserList /> },
              { path: "garages", element: <AllGarageList /> },
              { path: "bookings", element: <AllBookingList /> },
              { path: "payments", element: <AllPaymentList
                 /> }
        ]
    },
    // Garage Owner Route
  {
    path: "/garageowner/register",
    element: <GarageOwner />
  }
])

const AppRouter = () => {
    return <RouterProvider router={router}/>
}

export default AppRouter