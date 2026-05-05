import React from 'react'
import MenuBar from './components/MenuBar/MenuBar.jsx'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import Contact from './pages/Contact/Contact'
import ExploreFood from './pages/ExploreFood/ExploreFood'
import FoodDetails from './pages/FoodDetails/FoodDetails'
// import Cart from './pages/Cart/Cart' 
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import {ToastContainer} from 'react-toastify'

const App = () => {
  return (
    <div>
      <MenuBar/>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/explore" element={<ExploreFood/>} />
        <Route path="/getFood/:id" element={<FoodDetails/>} />
        {/* <Route path="/cart" element={<Cart />} /> */}
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </div>
  )
}
export default App
