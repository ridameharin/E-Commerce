import { useSelector } from "react-redux";
import { Outlet,Navigate } from "react-router-dom";

function Protect(){
    const userid=useSelector((state)=>state.auth.userid)

    if (userid){
        return <Navigate to='/' replace/>
    }
    return <Outlet/>
}
export default Protect;