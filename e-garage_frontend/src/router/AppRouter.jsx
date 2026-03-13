import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "../components/Login";
import  Signup  from "../components/SignUp";
import { UserNavbar } from "../components/user/UserNavbar";
import { AdminSidebar } from "../components/admin/AdminSidebar";
import { AllUserList } from "../components/admin/AllUserList";
import { UseEffectDemo } from "../components/user/UseEffectDemo";
import  GetApiDemo  from "../components/user/GetApiDemo";
import  Setting  from "../components/user/Setting";
import Logout from "../components/user/Logout";



const router = createBrowserRouter([
    {path:"/",element:<Login/>},
    {path:"/signup",element:<Signup/>},
    {
        path:"/user", element:<UserNavbar/>,
        children:[
            
                {path:"useeffectdemo",element:<UseEffectDemo/>},
                {path:"getapidemo",element:<GetApiDemo/>},
                {path:"setting",element:<Setting/>},
                {path:"logout",element:<Logout/>}
            
        ]
    },
    {
        path:'/admin', element:<AdminSidebar/>,
        children:[
            {
                path:'alluser', element:<AllUserList/>
            }
        ]
    }
])

const AppRouter = () => {
    return <RouterProvider router={router}/>
}

export default AppRouter