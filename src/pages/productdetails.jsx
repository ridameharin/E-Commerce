import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux"
import { addCart, getCart } from "../services/cartService"
import { addWishlist, getWishlist, deleteWishlist } from "../services/wishlistService";
import { setWishlist } from "../redux/wishlistSlice";
import { Heart } from "lucide-react";
import { toast } from "react-toastify";
import { setCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom"

function Productdetails() {

    const { id } = useParams();
    const [product, setProduct] = useState("")
    const [products, setProducts] = useState([])
    const navigate = useNavigate()
    const wishlist = useSelector((state) => state.wishlist.items)
    const dispatch = useDispatch()
    const userid = useSelector((state) => state.auth.userid)

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/products/${id}`)
            setProduct(response.data)
        }
        catch (error) {
            console.log(error);
        }
    }

    const fetchingProducts = async () => {
        try {
            const res = await axios.get("http://localhost:3000/products")
            setProducts(res.data)
        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchProduct()
        fetchingProducts()
    }, [id])

    const similarProducts = products.filter((item) =>
        item.category === product.category &&
        item.id !== product.id)

    const handleCartAdd = async () => {
        if (!userid) {
            navigate("/login")
            return;
        }
        try {
            await addCart(product, userid)
            const data = await getCart(userid)
            dispatch(setCart(data))
            toast.success("Item added to Cart")
        }
        catch (error) {
            console.log(error);
            toast.error("Failed to add item to Cart")
        }
    }
    const handleWishlist = async (product) => {
        if (!userid) {
            navigate("/login")
            return;
        }

        try {
            const current = await getWishlist(userid)
            const exist = current.find((prod) => prod.productId === product.id)
            if (exist) {
                await deleteWishlist(exist.id)
                const data = await getWishlist(userid)
                dispatch(setWishlist(data))
                toast.info("Removed from Wishlist")
            }
            else {
                await addWishlist(product, userid)
                const data = await getWishlist(userid)
                dispatch(setWishlist(data))
                toast.success("Added to Wishlist")
            }
        }
        catch (error) {
            console.log(error)
            toast.error("Failed to remove from wishlist")
        }
    }
    const handleBuynow = async () => {
        if (!userid) {
            navigate("/login")
            return
        }
        try {
            await addCart(product, userid)
            const data = await getCart(userid)
            dispatch(setCart(data))
            navigate("/checkout")
        }
        catch (error) {
            console.log(error);
        }
    }
    if (!product) {
        return (
            <div className="flex justify-center items-center h-96">
                <h3 className="text-[#5A4030] text-lg">Loading</h3>
            </div>
        )
    }
    return (
        <div className="min-h-screen w-full max-w-5xl mx-auto p-4 sm:p-6">
            <div className="bg-[#F5EDE2] rounded-2xl p-6 sm:p-8 lg:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    <div className="relative bg-[#F5EDE2] rounded-lg overflow-hidden">
                        <img src={product.image} alt={product.name}
                            className="w-full h-72 sm:h-96 lg:h-[500px] object-cover m-auto my-5 px-4 sm:px-7" />
                        <button onClick={() => handleWishlist(product)} type="button"
                            className="absolute top-4 right-6 bg-white rounded-full p-2">
                            <Heart size={35} className={
                                wishlist.some((item) => item.productId === product.id) ?
                                    "fill-[#6B4632] text-[#6B4632]" : "text-[#6B4632]"
                            } /></button>
                    </div>
                    <div className="px-2 lg:px-6 space-y-5">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#5A4030] mt-3">{product.name}</h1>
                        </div>
                        
                        <p className="text-xl sm:text-2xl font-semibold text-[#5A4030] mt-15">₹{product.price}</p>

                        <div className="flex items-center gap-2 mt-3">
                            <div className="text-yellow-500">
                                ★★★★★
                            </div>
                            <span className="text-gray-500 text-sm">
                                4.5
                            </span>
                        </div>
                        
                        <p className="text-green-600 font-medium mt-3">In Stock</p>
                        <div className="border-t border-gray-200 my-6 pt-5">
                            <p className="text-gray-600 text-xl leading-7 ">{product.description}</p>

                            <div className="mt-15">
                                <button onClick={handleCartAdd}
                                    className="w-full mt-3 bg-[#6B4632] text-white py-2 hover:bg-[#5A4030]">
                                    Add to Cart</button>
                                <button onClick={handleBuynow}
                                    className="w-full mt-3 bg-[#6B4632] text-white py-2 hover:bg-[#5A4030]">
                                    Buy Now</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-25">
                <h2 className="text-2xl sm:text-3xl font-serif text-[#5A4030] text-center mb-7">
                    Similar Products
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {similarProducts.map((item) => (
                        <div
                            key={item.id}
                            className="border border-[#E5D8CA] rounded-xl p-2 bg-white"
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-56 object-cover rounded-lg"
                            />

                            <h3 className="font-semibold mt-3">
                                {item.name}
                            </h3>

                            <p className="text-gray-500">
                                {item.category}
                            </p>

                            <p className="font-semibold mt-1">
                                ₹{item.price}
                            </p>

                            <button
                                onClick={() => navigate(`/productdetails/${item.id}`)}
                                className="w-full mt-3 bg-[#6B4632] text-white py-2 hover:bg-[#5A4030]"
                            >
                                View Product
                            </button>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}
export default Productdetails
