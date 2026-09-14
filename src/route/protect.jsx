import { useSelector } from "react-redux";
import { Outlet,Navigate } from "react-router-dom";
import Dashboard from "../pages/Admin/Dashboard";

function Protect(){
    const userid=useSelector((state)=>state.auth.userid)
    const role=useSelector((state)=>state.auth.role)

    if (userid){
        if(role==="admin"){
            return <Navigate to="/admin/Dashboard" replace/>
        }
        return <Navigate to='/' replace/>
    }
    return <Outlet/>
}
export default Protect;