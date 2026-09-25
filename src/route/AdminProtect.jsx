import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function AdminProtected(){
    const userid = useSelector((state) => state.auth.userid)
    const role = useSelector((state) => state.auth.role)
    if (!userid || role !== "admin") {
        return <Navigate to="/login" replace/>;
    }
    return <Outlet/>
}
export default AdminProtected