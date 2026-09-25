import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUsers } from "../../redux/AdminSlice/userSlice";
import { getUsers, updateUser } from "../../services/AdminService/userService";

function Users() {

    const users = useSelector((state) => state.users.users)
    const dispatch = useDispatch()

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        try {
            const data = await getUsers()
            dispatch(setUsers(data))
        }
        catch (error) {
            console.log(error)
        }
    }
    const handleBlock = async (user) => {
        try {
            const data = await updateUser(user.id, {
                blocked: !user.blocked
            })
            console.log("Updated user:", data)
            const updatedUsers = users.map((item) =>
                item.id === user.id ? data : item
            )
            dispatch(setUsers(updatedUsers))
        }
        catch (error) {
            console.log(error)
        }
    }
    const totalUsers = users.length;

    const customerUsers = users.filter(
        (user) => user.role !== "admin"
    ).length;

    const adminUsers = users.filter(
        (user) => user.role === "admin"
    ).length;

    const blockedUsers = users.filter(
        (user) => user.blocked
    ).length;

    return (
        <div>
            <h1 className="text-2xl font-serif text-[#5A4030] mb-6 max-sm:text-xl">User Management</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

                <div className="bg-[#FBF8F3] p-5 rounded-lg border border-[#DCCBBC]">
                    <p className="text-sm text-[#5A4030]">Total Users</p>
                    <h2 className="text-2xl font-serif text-[#5A4030] mt-2">{totalUsers}</h2>
                </div>

                <div className="bg-[#FBF8F3] p-5 rounded-lg border border-[#DCCBBC]">
                    <p className="text-sm text-[#5A4030]">Customer Users</p>
                    <h2 className="text-2xl font-serif text-[#5A4030] mt-2">{customerUsers}</h2>
                </div>

                <div className="bg-[#FBF8F3] p-5 rounded-lg border border-[#DCCBBC]">
                    <p className="text-sm text-[#5A4030]">Admin Users</p>
                    <h2 className="text-2xl font-serif text-[#5A4030] mt-2">{adminUsers}</h2>
                </div>

                <div className="bg-[#FBF8F3] p-5 rounded-lg border border-[#DCCBBC]">
                    <p className="text-sm text-[#5A4030]">
                        Blocked Users
                    </p>
                    <h2 className="text-2xl font-serif text-[#5A4030] mt-2">{blockedUsers}</h2>
                </div>
            </div>

            <div className="bg-[#FBF8F3] rounded-lg overflow-x-auto">
                <table className="w-full min-w-[800px]">
                    <thead className="bg-[#E9DED1]">
                        <tr>
                            <th className="text-left p-4">User ID</th>
                            <th className="text-left p-4">Name</th>
                            <th className="text-left p-4">Email</th>
                            <th className="text-left p-4">Role</th>
                            <th className="text-left p-4">Status</th>
                            <th className="text-left p-4">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center p-8 text-[#5A4030]">No users found.</td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user.id} className="border-t border-[#DCCBBC]">
                                    <td className="p-4">{user.id}</td>
                                    <td className="p-4">{user.fullName || user.name}</td>
                                    <td className="p-4">{user.email}</td>
                                    <td className="p-4">{user.role || "user"}</td>
                                    <td className="p-4">{user.blocked ? "Blocked" : "Active"}</td>
                                    <td className="p-4">
                                        <button
                                            onClick={() => handleBlock(user)} className="px-4 py-2 rounded-lg bg-[#6B4632] text-white">
                                            {user.blocked ? "Unblock" : "Block"}</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default Users