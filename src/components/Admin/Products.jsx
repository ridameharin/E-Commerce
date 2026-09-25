import { useState,useEffect } from "react"
import { useSelector,useDispatch } from "react-redux";
import { setProducts } from "../../redux/AdminSlice/productSlice";
import { getProducts,addProduct,deleteProduct,updateProduct } from "../../services/AdminService/productService";

function Products(){

    const products=useSelector((state)=>state.products.products)
    const dispatch=useDispatch()
    const [edit,setEdit]=useState(null)
    const [show,setShow]=useState(false)
    const [deleteId,setDeleteId]=useState(null)
    const [search,setSearch]=useState("")
    const [stock,setStock]=useState("All")
    const [currentpage,setCurrentpage]=useState(1)
    const productsperPage=7

    const [forms,setForms]=useState({
        name:"",image:"",category:"",price:"",stock:""
    })

    useEffect(()=>{
        fetchProducts()
    },[])

    const fetchProducts=async()=>{
        try{
            const data=await getProducts()
             dispatch(setProducts(data))
        }
        catch(error){
            console.log(error);
        }
    }
    const addProducts=async()=>{
        try{
            const data = await addProduct(forms)
            dispatch(setProducts([...products,data]))
            setForms({
                name:"",category:"",image:"",price:"",stock:""
            })
            setShow(false)
        }
        catch(error){
            console.log(error)
        }
    }
    const softDelete=async()=>{
        try{
            const data=await updateProduct(deleteId,{
            deleted:true,
            stock:0
        })
        const updated=products.map((item)=>
            item.id === deleteId ? data : item
        )
        dispatch(setProducts(updated))
        setDeleteId(null)
        }
        catch(error){
            console.log(error)
        }
    }
    const hardDelete=async()=>{
        try{
            await deleteProduct(deleteId)
            const updated = products.filter(
            (item) => item.id !== deleteId
        )
        dispatch(setProducts(updated))
        setDeleteId(null)
        }
        catch(error){
            console.log(error)
        }
    }
    const restockDelete=async(id)=>{
        try{
            const data=await updateProduct(id,{
            deleted:false,
            stock:1
        })
        const updated=products.map((item)=>
            item.id === id ? data : item
        )
        dispatch(setProducts(updated))
        }
        catch(error){
            console.log(error)
        }
    }
    const editProducts=async()=>{
        try{
            const data = await updateProduct(edit, forms)
            const update=products.map((item)=>item.id === edit ?data:item)
            dispatch(setProducts(update))
            setForms({
                name:"",category:"",price:"",image:"",stock:""
            })
            setEdit(null)
            setShow(false)
        }
        catch(error){
            console.log(error)       
        }
    }
    const handleEdit=(product)=>{
        setForms({
            name:product.name,
            image:product.image,
            category:product.category,
            price:product.price,
            stock:product.stock
        })
        setEdit(product.id)
        setShow(true)
    }
    const handle=(e)=>{
        setForms({
            ...forms,
            [e.target.name]:e.target.value
        })
    }
    const filteredProducts=products.filter((product)=>!product.deleted)
    .filter((product)=>product.name.toLowerCase().includes(search.toLowerCase()))
    .filter((product) =>{
        if (stock === "All") {
            return true
        }
        if (stock === "In Stock") {
            return Number(product.stock) > 0
        }
        if (stock === "Out of Stock") {
            return Number(product.stock) === 0
        }
    })

    const lastIndex=currentpage*productsperPage
    const firstIndex=lastIndex-productsperPage
    const currentProducts=filteredProducts.slice(firstIndex,lastIndex)
    const totalPages=Math.ceil(filteredProducts.length/productsperPage)

    return(
        <div className="w-full">
        <div className="flex justify-between items-start mb-4 max-sm:flex-col max-sm:gap-3">
            <div className="flex flex-col items-start gap-3">
            <h1 className="text-2xl font-serif text-[#5A4030]">Products</h1>
            <div className="flex gap-3 items-center">
            <input type="text" placeholder="Search product..." value={search} 
             onChange={(e)=>{setSearch(e.target.value) 
             setCurrentpage(1)}} className="border border-[#DCCBBC] px-4 py-2 rounded-lg outline-none max-sm:w-full"/>
             <select value={stock} onChange={(e)=>{setStock(e.target.value) 
                setCurrentpage(1)}} className="border border-[#DCCBBC] px-4 py-2 rounded-lg outline-none">
                <option value="All">All Stock</option>
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
             </select>
            </div>
            <h3 className="text-sm text-[#5A4030]">Total Products : {products.length}</h3>
            </div>
            <button onClick={()=>setShow(true)} className="bg-[#6B4632] text-white px-5 py-2 rounded-lg">
                + Add Product</button>
        </div>
        <div className="bg-[#FBF8F3] rounded-lg overflow-x-auto">
            {show && (
                <div className="bg-[#FBF8F3] p-6 rounded-lg mb-6">
                    <h2 className="text-xl font-serif text-[#5A4030] mb-4">Add Product</h2>
                    <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                        <input type="text" placeholder="Product Name" name="name" value={forms.name}
                        onChange={handle} className="border p-3 rounded-lg"/>
                        <input type="text" placeholder="Image URL" name="image" value={forms.image}
                        onChange={handle} className="border p-3 rounded-lg"/>
                        <input type="text" placeholder="Category" name="category" value={forms.category}
                        onChange={handle} className="border p-3 rounded-lg"/>
                        <input type="number" placeholder="Price" name="price" value={forms.price}
                        onChange={handle} className="border p-3 rounded-lg"/>
                        <input type="number" placeholder="Stock" name="stock" value={forms.stock}
                        onChange={handle} className="border p-3 rounded-lg"/>
                    </div>
                    <div className="mt-5 flex gap-3">
                        <button onClick={edit?editProducts:addProducts} className="bg-[#6B4632] text-white px-5 py-2 rounded-lg">
                            {edit? "Update Product":"Add Product"}</button>
                        <button onClick={()=>setShow(false)} className="bg-[#E9DED1] text-[#5A4030] px-5 py-2 rounded-lg">Cancel</button>
                    </div>
                </div>
            )}
            <table className="w-full min-w-[800px]">
                <thead className="bg-[#E9DED1]">
                    <tr>
                        <th className="text-left p-4">Products</th>
                        <th className="text-left p-4">Category</th>
                        <th className="text-left p-4">Price</th>
                        <th className="text-left p-4">Stock</th>
                        <th className="text-left p-4">Status</th>
                        <th className="text-left p-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.filter((product)=>!product.deleted).length===0?(
                    <tr>
                        <td colSpan="6" className="text-center p-8 text-[#5A4030]">No products found.</td>
                    </tr>
                    ):filteredProducts.length === 0 ?(
                    <tr>
                        <td colSpan="6" className="text-center p-8 text-[#5A4030]">No products found.</td>
                    </tr>
                ):(
                    currentProducts.map((product)=>(
                    <tr key={product.id} className="border-t border-[#DCCBBC]">
                        <td className="p-4">
                            <div className="flex items-center gap-4">
                                <img src={product.image} alt={product.title}
                                 className="w-16 h-16 object-cover rounded-lg" />
                                <span>{product.name}</span>
                            </div>
                        </td>
                        <td className="p-4">{product.category}</td>
                        <td className="p-4">₹{product.price}/-</td>                        
                        <td className="p-4">{product.stock}</td>                        

                        <td className="p-4">
                            {Number(product.stock) === 0
                            ? "Out of Stock": "In Stock"}
                        </td>
                        <td className="p-4">
                            <button onClick={()=>handleEdit(product)} className="mr-3 px-4 py-2 rounded-lg bg-[#E9DED1] text-[#5A4030]">Edit</button>
                            <button onClick={()=>setDeleteId(product.id)} className="px-4 py-2 rounded-lg bg-[#6B4632] text-white">Delete</button>
                        </td>
                    </tr>
                    )))}
                </tbody>
            </table>
        </div>

            <div className="mt-8 bg-[#FBF8F3] rounded-lg overflow-x-auto">
            <h2 className="text-xl font-serif text-[#5A4030] text-center border-b border-[#DCCBBC] py-4">Soft Deleted Products</h2>
                {products.filter((product) => product.deleted).length === 0 ?(
                    <div className="bg-[#FBF8F3] text-center p-8 text-[#5A4030] rounded-lg">
                        No soft deleted products.</div>
            ):(
                <table className="w-full min-w-[600px]">
             <thead className="bg-[#E9DED1]">
             <tr>
                <th className="text-left p-4">Product</th>
                <th className="text-left p-4">Category</th>
                <th className="text-left p-4">Price</th>
                <th className="text-left p-4">Action</th>
            </tr>
             </thead>

             <tbody>
                {products.filter((product) => product.deleted)
                .map((product) => (
                    <tr key={product.id}
                        className="border-t border-[#DCCBBC]">
                        <td className="p-4">
                            <div className="flex items-center gap-4">
                                <img src={product.image} alt={product.name}
                                className="w-16 h-16 object-cover rounded-lg"/>
                                <span>{product.name}</span>
                            </div>
                        </td>

                        <td className="p-4">{product.category}</td>
                        <td className="p-4">₹{product.price}</td>
                        <td className="p-4">
                            <button onClick={() => restockDelete(product.id)}
                                className="px-4 py-2 rounded-lg bg-[#6B4632] text-white">Restock</button>
                        </td>
                    </tr>
                ))}
             </tbody>
            </table>
            )}
            </div>
            {totalPages >1 && (
                <div className="flex justify-center items-center gap-3 mt-6">
                    <button onClick={()=>setCurrentpage(currentpage-1)} disabled={currentpage===1}
                    className="px-4 py-2 rounded-lg bg-[#E9DED1] text-[#5A4030] disabled:opacity-50">Previous</button>
                    <span className="text-[#5A4030]">Page {currentpage} of {totalPages}</span>
                    <button onClick={()=>setCurrentpage(currentpage+1)} disabled={currentpage===totalPages}
                    className="px-4 py-2 rounded-lg bg-[#E9DED1] text-[#5A4030] disabled:opacity-50">Next</button>
                    </div>
            )}

                {deleteId && (
                    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
                         <div className="bg-[#FBF8F3] p-6 rounded-lg shadow-lg w-96 max-sm:w-[90%]">
                            <h2 className="text-xl font-serif text-[#5A4030]">Delete Product</h2>
                            <p className="text-sm text-[#5A4030] mt-2">How would you like to delete this product?</p>
                            <div className="flex gap-3  mt-6 max-sm:flex-col">
                                <button onClick={softDelete} className="px-4 py-2 rounded-lg bg-[#E9DED1] text-[#5A4030]">Soft Delete</button>
                                <button onClick={hardDelete} className="px-4 py-2 rounded-lg bg-[#6B4632] text-white">Hard Delete</button>
                                <button onClick={()=>setDeleteId(null)} className="px-4 py-2 rounded-lg border border-[#DCCBBC] text-[#5A4030]">
                                    Cancel</button>
                            </div>
                         </div>
                     </div>
                )}

        
        </div>
    )
}
export default Products