import { useState,useEffect } from "react";
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";
import { setProducts } from "../../redux/productSlice";

function Products(){

    const products=useSelector((state)=>state.products.products)
    const dispatch=useDispatch()
    // const [prodcts,setProdcts]=useState([])
    const [show,setShow]=useState(false)
    const [forms,setForms]=useState({
        name:"",image:"",category:"",price:""
    })
    const getProducts=async()=>{
        try{
            const res=await axios.get("http://localhost:3000/products")
             dispatch(setProducts(res.data))
        }
        catch(error){
            console.log(error);
            
        }
    }
    const addProducts=async()=>{
        try{
            const response=await axios.post("http://localhost:3000/products",forms)
            dispatch(setProducts([...products,response.data]))
            setForms({
                name:"",category:"",image:"",price:""
            })
            setShow(false)
        }
        catch(error){
            console.log(error)
        }
    }
    const deleteProducts=async(id)=>{
        try{
            const response=await axios.delete(`http://localhost:3000/products/${id}`)
        const dlt=products.filter((item)=>item.id!==id)
        dispatch(setProducts(dlt))
        // return response.data
        console.log(response.data);
        
        }
        catch(error){
            console.log(error)
        }
    }
    const handle=(e)=>{
        setForms({
            ...forms,
            [e.target.name]:e.target.value
        })
    }
    useEffect(()=>{
        getProducts()
    },[])
    

    return(
        <div>
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-serif text-[#5A4030]">Products</h1>
            <button onClick={()=>setShow(true)} className="bg-[#6B4632] text-white px-5 py-2 rounded-lg">
                + Add Product</button>
        </div>
        <div className="bg-[#FBF8F3] rounded-lg overflow-hidden">
            {show && (
                <div className="bg-[#FBF8F3] p-6 rounded-lg mb-6">
                    <h2 className="text-xl font-serif text-[#5A4030] mb-4">Add Product</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="Product Name" name="name" value={forms.name}
                        onChange={handle} className="border p-3 rounded-lg"/>
                        <input type="text" placeholder="Image URL" name="image" value={forms.image}
                        onChange={handle} className="border p-3 rounded-lg"/>
                        <input type="text" placeholder="Category" name="category" value={forms.category}
                        onChange={handle} className="border p-3 rounded-lg"/>
                        <input type="number" placeholder="Price" name="price" value={forms.price}
                        onChange={handle} className="border p-3 rounded-lg"/>
                        <input type="number" placeholder="Stock" name="stock"
                        onChange={handle} className="border p-3 rounded-lg"/>
                    </div>
                    <div className="mt-5 flex gap-3">
                        <button onClick={addProducts} className="bg-[#6B4632] text-white px-5 py-2 rounded-lg">Add Product</button>
                        <button onClick={()=>setShow(false)} className="bg-[#E9DED1] text-[#5A4030] px-5 py-2 rounded-lg">Cancel</button>
                    </div>
                </div>
            )}
            <table className="w-full">
                <thead className="bg-[#E9DED1]">
                    <tr>
                        <th className="text-left p-4">Products</th>
                        <th className="text-left p-4">Category</th>
                        <th className="text-left p-4">Price</th>
                        <th className="text-left p-4">Stock</th>
                        <th className="text-left p-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product)=>(
                    <tr key={product.id} className="border-t border-[#DCCBBC]">
                        <td className="p-4">
                            <div className="flex items-center gap-4">
                                <img src={product.image} alt={product.title}
                                 className="w-16 h-16 object-cover rounded-lg" />
                                <span>{product.name}</span>
                            </div>
                        </td>
                        <td className="p-4">{product.category}</td>
                        <td className="p-4">₹{product.price}</td>
                        <td className="p-4">{product.stock}</td>
                        <td className="p-4">
                            <button className="mr-3 px-4 py-2 rounded-lg bg-[#E9DED1] text-[#5A4030]">Edit</button>
                            <button onClick={()=>deleteProducts(product.id)} className="px-4 py-2 rounded-lg bg-[#6B4632] text-white">Delete</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    )
}
export default Products