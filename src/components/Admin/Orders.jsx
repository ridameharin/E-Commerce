import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrders, updateOrder } from "../../services/AdminService/orderService";
import { setOrders } from "../../redux/AdminSlice/orderSlice";

function Orders() {

    const orders = useSelector((state) => state.orders.orders)
    const dispatch = useDispatch()
    const [selectorder, setSelectorder] = useState(null)
    const [statusfilter,setStatusfilter]=useState("All")
    const fetchOrders = async () => {
        try {
            const data = await getOrders()
            dispatch(setOrders(data))
        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchOrders()
    }, [])
    const handleStatus = async (order, status) => {
        try {
            const data = await updateOrder(order.id, {
                status: status
            })
            const update = orders.map((item) =>
                item.id === order.id ? data : item)
            dispatch(setOrders(update))
        }
        catch (error) {
            console.log(error)
        }
    }
    const filteredstatus=orders.filter((order)=>{
        if(statusfilter==="All"){
            return true
        }
        return (order.status || "pending").toLowerCase()===statusfilter.toLowerCase()
    })
    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-serif text-[#5A4030]">Order Management</h1>
               <p className="text-[#7A6252] mt-2">View customer orders, filter by status, and update statuses in real-time</p>
            </div>
            <div className="bg-[#FBF8F3] border border-[#DCCBBC] rounded-xl p-5 w-52 shadow-sm mb-6">
                <p className="text-sm text-[#7A6252]">Total Orders</p>
                <p className="text-3xl font-semibold text-[#5A4030] mt-2">{orders.length}</p>
            </div>
            <div className="bg-[#FBF8F3] rounded-xl px-5 py-4 mb-5 border border-[#DCCBBC] shadow-sm">
                <div className="flex justify-between items-center">
                    <label className="text-sm text-[#5A4030]">Filter Status:</label>
                    <select value={statusfilter} onChange={(e)=>setStatusfilter(e.target.value)}
                        className="border border-[#DCCBBC] rounded-lg px-4 py-3 bg-[#FBF8F3] text-[#5A4030] outline-none">
                        <option value="All">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </div>
            <div className="bg-[#FBF8F3] rounded-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-[#E9DED1]">
                        <tr>
                            <th className="text-left p-4">ORDER ID</th>
                            <th className="text-left p-4">NAME</th>
                            <th className="text-left p-4">EMAIL</th>
                            <th className="text-left p-4">ITEMS</th>
                            <th className="text-left p-4">TOTAL</th>
                            <th className="text-left p-4">PAYMENT</th>
                            <th className="text-left p-4">STATUS</th>
                            <th className="text-left p-4">ACTION</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredstatus.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="text-center p-8 text-[#5A4030]">No Orders Found</td>
                            </tr>
                        ) : (
                            filteredstatus.map((order) => (
                                <tr key={order.id} className="border-t border-[#DCCBBC]">
                                    <td className="p-4">{order.id}</td>
                                    <td className="p-4">{order.name}</td>
                                    <td className="p-4">{order.email}</td>
                                    <td className="p-4">{order.items.reduce((total,item)=>total+item.quantity,0)}</td>
                                    <td className="p-4">₹{order.total}</td>
                                    <td className="p-4">{order.payment}</td>
                                    <td className="p-4">
                                        <select value={order.status || "pending"} onChange={(e) => handleStatus(order, e.target.value)}
                                            className="border border-[#DCCBBC] rounded-lg px-3 py-2 bg-[#FBF8F3] text-[#5A4030]">
                                            <option value="pending">Pending</option>
                                            <option value="confirmed">Confirmed</option>
                                            <option value="shipped">Shipped</option>
                                            <option value="delivered">Delivered</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                    <td className="p-4">
                                        <button onClick={()=>setSelectorder(order)} className="px-4 py-2 rounded-lg bg-[#6B4632] text-white">View</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {selectorder && (
                <div className="mt-8 bg-[#FBF8F3] rounded-lg p-6 border border-[#DCCBBC]">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-serif text-[#5A4030]">Order Details</h2>
                        <button onClick={() => setSelectorder(null)}
                            className="px-4 py-2 rounded-lg bg-[#E9DED1] text-[#5A4030]">Close</button>
                    </div>
                    <div>
                        <p><strong>Order ID:</strong>{selectorder.id}</p>
                        <p><strong>Customer:</strong>{selectorder.name} </p>
                        <p><strong>Email:</strong>{selectorder.email}</p>
                        <p><strong>Phone:</strong>{selectorder.phone}</p>
                        <p><strong>Address:</strong>{selectorder.address}</p>
                        <p><strong>City:</strong>{selectorder.city}</p>
                        <p><strong>PIN:</strong>{selectorder.pin}</p>
                        <p><strong>Payment:</strong> {selectorder.payment}</p>
                        <p><strong>Total:</strong>₹{selectorder.total}</p>
                        <p><strong>Status:</strong>{selectorder.status || "Pending"} </p>
                    </div>
                    <h3 className="text-lg font-serif text-[#5A4030] mb-4">Items</h3>
                    <div className="space-y-4">

                        {selectorder.items.map((item) => (
                            <div key={item.id} className="flex items-center gap-4 border-t border-[#DCCBBC] pt-4">
                                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg"/>
                                <div>
                                    <p className="font-medium text-[#5A4030]">{item.name}</p>
                                    <p>₹{item.price} × {item.quantity}</p>
                                </div>
                            </div>

                        ))}

                    </div>
                </div>
            )}
        </div>
    )
}
export default Orders