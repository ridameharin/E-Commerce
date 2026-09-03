import { Link } from "react-router-dom";
function Footer(){

    return(
        <footer className="bg-[#F5EDE2] text-[#5A4030] px-10 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-4 gap-10">

            <div>
                <h2 className="text-2xl font-serif">CROCHETTELLA</h2>
                <p className="mt-3 text-sm text-gray-600 leading-6">
                    Handcrafted with
                    <br/>
                    love, made for you
                </p>
            </div>

            <div className="font-medium mb-5">
                <h3>EXPLORE</h3>
                <ul className="space-y-3 text-sm text-gray-600">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/productDetails">Shop</Link></li>
                    <li><Link to="/collections">Collections</Link></li>
                    {/* <li>About</li> */}
                </ul>
            </div>

            <div>
                <h3 className="font-medium mb-5">SUPPORT</h3>
                <ul className="space-y-3 text-sm text-gray-600">
                    <li>Contact Us</li>
                    <li>Shipping & Delivery</li>
                    <li>Returns & Refunds</li>
                    <li>FAQs</li>
                </ul>
            </div>

            <div>
                <h3 className="font-medium mb-5">CONNECT WITH US</h3>
                <p>hello@crochettella.com</p>
            </div>

          </div>
           <div className="max-w-7xl flex justify-between text-sm text-gray-500">
                <p>© 2026 Crochettella</p>
                <p>All Rights Reserved</p>
            </div>
        </footer>
    )
}
export default Footer;