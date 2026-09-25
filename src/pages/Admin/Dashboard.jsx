import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Package, Users, ShoppingBag, IndianRupee, ArrowRight } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { getProducts } from "../../services/AdminService/productService";
import { getUsers } from "../../services/AdminService/userService";
import { getOrders } from "../../services/AdminService/orderService";
import { setProducts } from "../../redux/AdminSlice/productSlice";
import { setUsers } from "../../redux/AdminSlice/userSlice";
import { setOrders } from "../../redux/AdminSlice/orderSlice";


function Dashboard() {

    const dispatch = useDispatch();
    const [revenueFilter, setRevenueFilter] = useState("monthly")
    const products = useSelector((state) => state.products.products)
    const users = useSelector((state) => state.users.users)
    const orders = useSelector((state) => state.orders.orders)
    const fetchDashboardData = async () => {
        try {
            const productData = await getProducts()
            const userData = await getUsers()
            const orderData = await getOrders()
            dispatch(setProducts(productData))
            dispatch(setUsers(userData))
            dispatch(setOrders(orderData))
        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchDashboardData()
    }, [dispatch])

    const activeProducts = products.filter((product) => !product.deleted)
    const revenue = orders.reduce((total, order) => total + Number(order.total || 0), 0)
    const pendingOrders = orders.filter((order) => (order.status || "pending").toLowerCase() === "pending").length
    const confirmedOrders = orders.filter((order) => (order.status || "pending").toLowerCase() === "confirmed").length
    const shippedOrders = orders.filter((order) => (order.status || "pending").toLowerCase() === "shipped").length
    const deliveredOrders = orders.filter((order) => (order.status || "pending").toLowerCase() === "delivered").length
    const cancelledOrders = orders.filter((order) => (order.status || "pending").toLowerCase() === "cancelled").length
    const monthlyRevenue = Array.from(
        { length: 12 },
        (_, monthIndex) => {
            const total = orders
                .filter((order) => {
                    if (!order.date) {
                        return false
                    }
                    const date = new Date(order.date)
                    return date.getMonth() === monthIndex
                })
                .reduce((total, order) => total + Number(order.total || 0), 0)
            return {
                month: new Date(2026, monthIndex).toLocaleString("en-US", {
                    month: "short"
                }),
                revenue: total
            }
        }
    )

    const weeklyRevenue = Array.from(
        { length: 7 },
        (_, dayIndex) => {
            const today = new Date()
            const currentDay = today.getDay();
            const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
            const date = new Date(today)
            date.setDate(today.getDate() + mondayOffset + dayIndex
            )
            const total = orders.filter((order) => {
                if (!order.date) {
                    return false
                }
                const orderDate =
                    new Date(order.date)
                return (
                    orderDate.getFullYear() === date.getFullYear() &&
                    orderDate.getMonth() === date.getMonth() &&
                    orderDate.getDate() === date.getDate()
                );

            })
                .reduce((total, order) => total + Number(order.total || 0), 0)

            return {
                day: date.toLocaleString(
                    "en-US",
                    {
                        weekday: "short"
                    }
                ),
                revenue: total
            }
        }
    )

    const revenueData = revenueFilter === "monthly" ? monthlyRevenue : weeklyRevenue;
    const recentOrders = orders.slice(0, 5);

    return (

        <div className="space-y-8">
            <div>
                <h1 className="text-3xl max-sm:text-2xl font-serif text-[#5A4030]">Admin Dashboard</h1>
                <p className="text-[#7A6252] mt-2">Welcome back, Admin. Here's your store overview.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                <div className="bg-[#FBF8F3] border border-[#DCCBBC] rounded-xl p-5">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-[#7A6252]">Products</p>
                            <p className="text-3xl font-semibold text-[#5A4030] mt-3">{activeProducts.length}</p>
                            <p className="text-xs text-[#8A7566] mt-2">Active products</p>
                        </div>

                        <div className="p-3 rounded-lg bg-[#E9DED1]">
                            <Package size={22} className="text-[#6B4632]" />
                        </div>
                    </div>
                </div>

                <div className="bg-[#FBF8F3] border border-[#DCCBBC] rounded-xl p-5">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-[#7A6252]">Customers</p>
                            <p className="text-3xl font-semibold text-[#5A4030] mt-3">{users.length}</p>
                            <p className="text-xs text-[#8A7566] mt-2">Registered users</p>
                        </div>

                        <div className="p-3 rounded-lg bg-[#E9DED1]">
                            <Users size={22} className="text-[#6B4632]" />
                        </div>
                    </div>
                </div>

                <div className="bg-[#FBF8F3] border border-[#DCCBBC] rounded-xl p-5">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-[#7A6252]">Orders</p>
                            <p className="text-3xl font-semibold text-[#5A4030] mt-3">{orders.length}</p>
                            <p className="text-xs text-[#8A7566] mt-2">Customer orders</p>
                        </div>
                        <div className="p-3 rounded-lg bg-[#E9DED1]">
                            <ShoppingBag size={22} className="text-[#6B4632]" />
                        </div>
                    </div>
                </div>

                <div className="bg-[#FBF8F3] border border-[#DCCBBC] rounded-xl p-5">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-[#7A6252]">Revenue</p>
                            <p className="text-3xl font-semibold text-[#5A4030] mt-3">₹{revenue.toLocaleString("en-IN")}</p>
                            <p className="text-xs text-[#8A7566] mt-2">From all orders</p>
                        </div>

                        <div className="p-3 rounded-lg bg-[#E9DED1]">
                            <IndianRupee size={22} className="text-[#6B4632]" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-[#FBF8F3] border border-[#DCCBBC] rounded-xl p-6">
                    <div className="flex justify-between items-center mb-6 max-sm:flex-col max-sm:items-start max-sm:gap-4">
                        <div>
                            <h2 className="text-xl font-serif text-[#5A4030]">
                                {revenueFilter === "monthly" ? "Monthly Revenue" : "Weekly Revenue"}</h2>
                            <p className="text-sm text-[#7A6252] mt-1">Revenue generated from orders</p>
                        </div>

                        <select value={revenueFilter} onChange={(e) => setRevenueFilter(e.target.value)}
                            className="border border-[#DCCBBC] bg-[#FBF8F3] text-[#5A4030] rounded-lg px-3 py-2 text-sm outline-none">
                            <option value="monthly">Monthly</option>
                            <option value="weekly">Weekly</option>
                        </select>
                    </div>

                    <div className="w-full h-[300px] max-sm:h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={revenueData}
                                margin={{
                                    top: 10, right: 20, left: 0, bottom: 10
                                }}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#DCCBBC"
                                />

                                <XAxis
                                    dataKey={
                                        revenueFilter === "monthly"
                                            ? "month"
                                            : "day"
                                    }
                                    tick={{
                                        fill: "#7A6252",
                                        fontSize: 12
                                    }}
                                />

                                <YAxis
                                    tickFormatter={(value) =>
                                        `₹${value}`
                                    }
                                    tick={{
                                        fill: "#7A6252",
                                        fontSize: 12
                                    }}
                                />

                                <Tooltip
                                    formatter={(value) => [
                                        `₹${Number(value).toLocaleString("en-IN")}`,
                                        "Revenue"
                                    ]} />
                                <Line
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#6B4632"
                                    strokeWidth={3}
                                    dot={{ r: 5 }}
                                    activeDot={{ r: 7 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-[#FBF8F3] border border-[#DCCBBC] rounded-xl p-6">
                    <div className="mb-6">
                        <h2 className="text-xl font-serif text-[#5A4030]">Order Status</h2>
                        <p className="text-sm text-[#7A6252] mt-1">Current order summary</p>
                    </div>

                    <div className="space-y-5">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-[#7A6252]">Pending</span>
                            <span className="font-semibold text-[#5A4030]">{pendingOrders}</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-sm text-[#7A6252]">Confirmed</span>
                            <span className="font-semibold text-[#5A4030]">{confirmedOrders}</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-sm text-[#7A6252]">Shipped</span>
                            <span className="font-semibold text-[#5A4030]">{shippedOrders}</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-sm text-[#7A6252]">Delivered</span>
                            <span className="font-semibold text-[#5A4030]">{deliveredOrders}</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-sm text-[#7A6252]">Cancelled</span>
                            <span className="font-semibold text-[#5A4030]">{cancelledOrders}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-[#FBF8F3] border border-[#DCCBBC] rounded-xl overflow-hidden">
                <div className="flex justify-between items-center p-6 border-b border-[#DCCBBC] max-sm:flex-col max-sm:items-start max-sm:gap-3">
                    <div>
                        <h2 className="text-xl font-serif text-[#5A4030]">Recent Orders</h2>
                        <p className="text-sm text-[#7A6252] mt-1">Latest orders from your customers</p>
                    </div>

                    <a href="/admin/orders" className="flex items-center gap-2 text-sm text-[#6B4632] hover:underline">
                        View All<ArrowRight size={16} /></a>
                </div>


                <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px]">
                        <thead className="bg-[#E9DED1]">
                            <tr>
                                <th className="text-left p-4 text-xs font-medium text-[#5A4030]">ORDER ID</th>
                                <th className="text-left p-4 text-xs font-medium text-[#5A4030]">CUSTOMER</th>
                                <th className="text-left p-4 text-xs font-medium text-[#5A4030]">ITEMS</th>
                                <th className="text-left p-4 text-xs font-medium text-[#5A4030]">TOTAL</th>
                                <th className="text-left p-4 text-xs font-medium text-[#5A4030]">PAYMENT</th>
                                <th className="text-left p-4 text-xs font-medium text-[#5A4030]">STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.map((order) => (
                                <tr key={order.id} className="border-t border-[#DCCBBC] hover:bg-[#F5EDE2] transition">
                                    <td className="p-4 text-sm text-[#5A4030]">#{order.id}</td>
                                    <td className="p-4">
                                        <p className="text-sm font-medium text-[#5A4030]">{order.name}</p>
                                        <p className="text-xs text-[#7A6252] mt-1">{order.email}</p>
                                    </td>
                                    <td className="p-4 text-sm text-[#5A4030]">
                                        {order.items?.reduce((total, item) => total + Number(item.quantity || 0), 0)}</td>
                                    <td className="p-4 text-sm font-medium text-[#5A4030]">₹{Number(order.total || 0).toLocaleString("en-IN")}</td>
                                    <td className="p-4 text-sm text-[#5A4030]">{order.payment}</td>
                                    <td className="p-4">
                                        <span className="inline-block px-3 py-1 rounded-full text-xs bg-[#E9DED1] text-[#6B4632]">
                                            {order.status || "Pending"}</span>
                                    </td>
                                </tr>
                            ))}

                            {recentOrders.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="text-center p-10 text-[#7A6252]">No orders found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;