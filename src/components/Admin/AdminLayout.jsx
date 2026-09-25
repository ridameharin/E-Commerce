import { Outlet, Link } from "react-router-dom";
import { LayoutDashboard, Package, Users, ShoppingBag, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/authSlice";

function AdminLayout() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-[#F5EDE2]">
            <aside className="fixed left-0 top-0 w-64 h-screen bg-[#5A4030] text-white flex flex-col max-lg:w-full max-lg:h-auto max-lg:relative">
                <div className="px-6 py-7 border-b border-[#765A47] max-lg:px-5 max-lg:py-4">
                    <h1 className="text-2xl font-serif">CROCHETTELLA</h1>
                    <p className="mt-2 text-sm">Admin Panel</p>
                </div>
                <nav className="flex-1 px-4 py-6 space-y-2 max-lg:flex max-lg:overflow-x-auto max-lg:py-3 max-lg:gap-2 max-lg:space-y-0">

                    <Link to="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#6B4632] max-lg:px-3">
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </Link>

                    <Link to="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#6B4632] max-lg:px-3">
                        <Package size={20} />
                        <span>Products</span>
                    </Link>

                    <Link to="/admin/users" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#6B4632] max-lg:px-3">
                        <Users size={20} />
                        <span>Users</span>
                    </Link>

                    <Link to="/admin/orders" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#6B4632] max-lg:px-3">
                        <ShoppingBag size={20} />
                        <span>Orders</span>
                    </Link>

                </nav>
                <div className="px-4 py-5 border-t border-[#765A47] max-lg:px-4 max-lg:py-3 max-lg:border-t">
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#6B4632] max-lg:w-auto max-lg:px-3 max-lg:py-2">
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            <div className="ml-64 min-h-screen min-w-0 max-lg:ml-0">
                <main className="p-6 sm:p-8 max-sm:p-4">
                    <Outlet />
                </main>

            </div>
        </div>
    )
}
export default AdminLayout;