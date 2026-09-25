import {Routes,Route} from 'react-router-dom'
import { ToastContainer } from "react-toastify";

// import Navbar from './components/Navbar'
// import Footer from './components/footer'
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
import About from './pages/aboutus';
import Layout from './components/layout';
import Featured from './components/featured';
import Notfound from './pages/Notfound';
import Protect from './route/protect';

import Dashboard from './pages/Admin/Dashboard';
import AdminProtected from './route/AdminProtect';
import AdminLayout from './components/Admin/AdminLayout';
import Products from './components/Admin/Products';
import Users from './components/Admin/Users';
import Orders from './components/Admin/Orders';
import User from './route/user';


function App(){

  return(
   <>
   {/* <Navbar/> */}
    <Routes>
      <Route element={<Protect/>}>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      </Route>
         
    <Route element={<Layout/>}>

      <Route element={<User/>}>
      <Route path='/' element={<Home />} />   
      <Route path='/productdetails/:id' element={<Productdetails />} />
      <Route path='/shop' element={<Shop/>}/>
      <Route path='/categories' element={<Categories />}/>
      <Route path='/categorydetails/:category' element={<Categorydetails />}/>
      <Route path='/category' element={<Category/>}/>
      <Route path='/menu' element={<Menu/>}/>  
      <Route path='/aboutus' element={<About/>}/>
      <Route path='/featured' element={<Featured/>}/>
      </Route>

      <Route element={<ProtectedRoute/>}>
        <Route path='/wishlist' element={<Wishlist />} /> 
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/order' element={<Order />} />
        <Route path='/orderhistory' element={<Orderhistory />} />      
        <Route path='/profile' element={<Profile />} />      
      </Route>
      </Route>

      <Route element={<AdminProtected/>}>
        <Route element={<AdminLayout/>}>
          <Route path="/admin/dashboard" element={<Dashboard />}/>
          <Route path="/admin/products" element={<Products />}/>
          <Route path="/admin/users" element={<Users />}/>
          <Route path="/admin/orders" element={<Orders />}/>
        </Route>
      </Route>

      <Route path='*' element={<Notfound/>}/>
    </Routes>
    {/* <Footer/> */}
    <ToastContainer />
   </>
  )
}
export default App;