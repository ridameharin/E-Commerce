import axios from "axios";

const API2="http://localhost:3000/orders"

export const getOrders = async (userid) => {
    const response = await axios.get(`${API2}?userid=${userid}`)
    return response.data;
};