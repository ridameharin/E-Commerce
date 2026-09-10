import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Featured() {

    const [products, setProducts] = useState([]);
    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:3000/products")
            const featured = response.data.filter((product) =>
                ["2","22","15"].includes(product.id)
            )
            setProducts(featured);
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchProducts();
    }, [])

    return (
        <div className="min-h-screen px-5 sm:px-8 py-10 bg-[#FEFCFA]">

            <div className="text-center mb-10">
                <h1 className="text-3xl sm:text-4xl font-serif text-[#5A4030]">FEATURED PICKS</h1>
                <p className="text-[#8A6F5C] mt-2">Handpicked pieces made with love.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {products.map((product) => (
                    <Link key={product.id} to={`/productdetails/${product.id}`}
                        className="bg-[#FBF8F3] border border-[#E5D8CA] rounded-2xl p-4 border border-[#E5D8CA] 
                        rounded-xl p-4 bg-white hover:border-[#C9AD96] hover:-translate-y-1 hover:shadow-md">
                        <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-xl"/>
                        <div className="pt-4">
                            <h2 className="text-lg font-semibold text-[#5A4030]">{product.name}</h2>
                            <p className="text-[#8A6F5C] mt-1">{product.category}</p>
                            <p className="text-[#6B4632] font-semibold mt-2">₹{product.price}</p>
                        </div>
                    </Link>

                ))}

            </div>

            <div className="flex justify-center mt-10">
                <Link to="/shop" className="bg-[#6B4632] text-white px-8 py-3 rounded-full hover:bg-[#5A4030]">SHOP ALL</Link>
            </div>

        </div>
    );
}

export default Featured;