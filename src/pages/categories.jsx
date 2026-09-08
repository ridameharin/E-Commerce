import { Link } from "react-router-dom";

function Categories(){

    return(
        <>
         <div>

        <div className="text-center mb-10">
        <h2 className="font-serif text-2xl text-[#5A4030]">CATEGORIES</h2>
        <p className="text-[#8A6F5C] text-sm mt-2">Explore our handmade crochet pieces</p>
        </div>

       <div className="max-w-6xl grid grid-cols-3 mx-auto gap-6">
         <Link to='/categorydetails/Bags'>
        <div>
        <div>
            <img src="/bags.jpg" alt="bags" className="w-full h-64 object-cover"/>
        </div>
        <h3 className="text-center mt-3 text-[#5A4030]">Bags</h3>
        </div>
        </Link>

        <Link to='/categorydetails/Clothes'>
        <div>
            <div>
                <img src="/clothes.jpg" alt="clothes" className="w-full h-64 object-cover"/>
            </div>
            <h3 className="text-center mt-3 text-[#5A4030]">Clothes</h3>
        </div>
        </Link>

        <Link to='/categorydetails/Toys'>
        <div>
            <div>
                <img src="/toys.jpg" alt="toys" className="w-full h-64 object-cover"/>
            </div>
            <h3 className="text-center mt-3 text-[#5A4030]">Toys</h3>
        </div>
        </Link>

        <Link to='/categorydetails/Accessories'>
        <div>
            <div>
                <img src="/accessories.jpg" alt="accessories" className="w-full h-64 object-cover"/>
            </div>
            <h3 className="text-center mt-3 text-[#5A4030]">Accessories</h3>
        </div>
        </Link>

        <Link to='/categorydetails/Decors'>
        <div>
            <div>
                <img src="/decor.jpg" alt="decors" className="w-full h-64 object-cover"/>
            </div>
            <h3 className="text-center mt-3 text-[#5A4030]">Decors</h3>
        </div>
        </Link>

        <Link to='/categorydetails/Gifts'>
        <div>
            <div>
                <img src="/gift.jpg" alt="gifts"  className="w-full h-64 object-cover"/>
            </div>
            <h3 className="text-center mt-3 text-[#5A4030]">Gifts</h3>
        </div>
        </Link>

       </div>

        </div>
        </>
    )
}
export default Categories;