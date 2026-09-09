import {Routes,Route} from 'react-router-dom'
import { ToastContainer } from "react-toastify";

import Navbar from './components/Navbar'
import Footer from './components/footer'
import Home from './pages/home'
import Cart from './pages/cart'
import Login from './pages/login'
import Register from './pages/register'
import Order from './pages/order'
import Wishlist from './pages/wishlist'
import Productdetails from './pages/productdetails'
import Categories from'./pages/categories'
import Shop from './pages/shop'
import Checkout from './pages/checkout'
import ProtectedRoute from './route/protectedRoute';
import Category from './components/category';
import Categorydetails from './pages/categorydetails';
import Orderhistory from './pages/orderhistory';
import Profile from './pages/profile';
import Menu from './components/menu';


function App(){

  return(
   <>
   <Navbar/>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />     
      <Route path='/productdetails/:id' element={<Productdetails />} />
      <Route path='/shop' element={<Shop/>}/>
      <Route path='/categories' element={<Categories />}/>
      <Route path='/categorydetails/:category' element={<Categorydetails />}/>
      <Route path='/category' element={<Category/>}/>
      <Route path='/menu' element={<Menu/>}/>  

      <Route element={<ProtectedRoute/>}>
        <Route path='/wishlist' element={<Wishlist />} /> 
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/order' element={<Order />} />
        <Route path='/orderhistory' element={<Orderhistory />} />      
        <Route path='/profile' element={<Profile />} />      
      </Route>

    </Routes>
    <Footer/>
    <ToastContainer />
   </>
  )
}
export default App;