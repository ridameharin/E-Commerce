import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoute(){
    const userid = useSelector((state) => state.auth.userid);
    if (!userid) {
        return <Navigate to="/login" replace/>;
    }
    
    return <Outlet/>
}
export default ProtectedRoute