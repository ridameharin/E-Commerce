import { Navigate,Outlet } from "react-router-dom";

function User(){
    const role=localStorage.getItem("userRole")
    if(role==="admin"){
        return <Navigate to="/admin/dashboard" replace/>
    }
    return <Outlet/>
}
export default User