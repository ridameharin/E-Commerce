import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

function ProtectedRoute({children}){
    const userid = useSelector((state) => state.auth.userid);
    if (!userid) {
        return <Navigate to="/login" />;
    }
    
    return <Outlet/>
}
export default ProtectedRoute