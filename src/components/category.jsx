import { Link } from "react-router-dom"

function Category(){

    return(
        <div className="min-h-screen border border-[#E5D8CA] rounded-xl p-4 sm:p-6 bg-[#FDFBF8]">

        <div className="text-center mb-8 sm:mb-10">
        <h2 className="font-serif text-xl sm:text-3xl text-[#5A4030]">OUR COLLECTIONS</h2>
        <p className="text-[#8A6F5C] sm:text-xl mt-2">Explore our handmade pieces</p>
        </div>

       <div className="max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto gap-6 px-4">
        <Link to='/categorydetails/Bags'>
        <div className="border border-[#E5D8CA] rounded-xl p-4 bg-white hover:border-[#C9AD96] hover:-translate-y-1 hover:shadow-md">
        <div>
            <img src="/bags.jpg" alt="bags" className="w-full h-56 sm:64 object-cover rounded-lg border border-[#E5D8CA] mb-6"/>
        </div>
        <h3 className="text-center mt-3 text-[#5A4030]">Bags</h3>
        </div>
        </Link>

        <Link to='/categorydetails/Clothes'>
        <div className="border border-[#E5D8CA] rounded-xl p-4 bg-white hover:border-[#C9AD96] hover:-translate-y-1 hover:shadow-md">
            <div>
                <img src="/clothes.jpg" alt="clothes" className="w-full h-56 sm:64 object-cover rounded-lg border border-[#E5D8CA] mb-6"/>
            </div>
            <h3 className="text-center mt-3 text-[#5A4030]">Clothes</h3>
        </div>
        </Link>

        <Link to='/categorydetails/Toys'>
        <div className="border border-[#E5D8CA] rounded-xl p-4 bg-white hover:border-[#C9AD96] hover:-translate-y-1 hover:shadow-md">
            <div>
                <img src="/toys.jpg" alt="toys" className="w-full h-56 sm:64 object-cover rounded-lg border border-[#E5D8CA] mb-6"/>
            </div>
            <h3 className="text-center mt-3 text-[#5A4030]">Toys</h3>
        </div>
        </Link>

        <Link to='/categorydetails/Accessories'>
        <div className="border border-[#E5D8CA] rounded-xl p-4 bg-white hover:border-[#C9AD96] hover:-translate-y-1 hover:shadow-md">
            <div>
                <img src="/accessories.jpg" alt="accessories" className="w-full h-56 sm:64 object-cover rounded-lg border border-[#E5D8CA] mb-6"/>
            </div>
            <h3 className="text-center mt-3 text-[#5A4030]">Accessories</h3>
        </div>
        </Link>

        <Link to='/categorydetails/Decors'>
        <div className="border border-[#E5D8CA] rounded-xl p-4 bg-white hover:border-[#C9AD96] hover:-translate-y-1 hover:shadow-md">
            <div>
                <img src="/decor.jpg" alt="decors" className="w-full h-56 sm:64 object-cover rounded-lg border border-[#E5D8CA] mb-6"/>
            </div>
            <h3 className="text-center mt-3 text-[#5A4030]">Decors</h3>
        </div>
        </Link>

        <Link to='/categorydetails/Gifts'>
        <div className="border border-[#E5D8CA] rounded-xl p-4 bg-white hover:border-[#C9AD96] hover:-translate-y-1 hover:shadow-md">
            <div>
                <img src="/gift.jpg" alt="gifts"  className="w-full h-56 sm:64 object-cover rounded-lg border border-[#E5D8CA] mb-6"/>
            </div>
            <h3 className="text-center mt-3 text-[#5A4030]">Gifts</h3>
        </div>
        </Link>

       </div>
        </div>
    )
}
export default Category