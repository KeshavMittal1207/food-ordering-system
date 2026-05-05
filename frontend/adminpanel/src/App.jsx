import React from 'react'
import {Routes , Route} from 'react-router-dom'
import SideBar from './components/SideBar/SideBar.jsx'
import MenuBar from './components/MenuBar/MenuBar.jsx'
import AddFood from './pages/AddFood/AddFood.jsx'
import ListFood from './pages/ListFood/ListFood.jsx'
import Orders from './pages/Orders/Orders.jsx'
import {useState} from 'react'
import {ToastContainer} from 'react-toastify';


const App = () => {
    const[sideBarVisible , setSideBarVisible] = useState(true);
    const toggleSideBar = () => {
        setSideBarVisible(!sideBarVisible);
    }
  return (
      <div className="d-flex" id="wrapper">
        <SideBar sideBarVisible={sideBarVisible} />
            <div id="page-content-wrapper">
                <MenuBar toggleSideBar={toggleSideBar} />
                <ToastContainer/>

                <div className="container-fluid">
                    <Routes>
                        <Route path='/add' element={<AddFood />} />
                        <Route path='/list' element={<ListFood />} />
                        <Route path='/orders' element={<Orders />} />
                        <Route path='/' element={<ListFood />} />
                    </Routes>

                </div>
            </div>
    </div>
  )
}

export default App
