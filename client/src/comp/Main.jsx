import React from 'react'
import { Routes, Route } from 'react-router-dom';
import About from './About';
import AddVacation from './admin/AddVacation';
import Report from './admin/Report';
import UpdateVacation from './admin/UpdateVacation';
import Feed from './Feed';
import Login from './Login';
import MyVacations from './MyVacations';
import Register from './Register';
import Vacations from './Vacations';

export default function Main() {
    return (
        <div className='main'>
            <Routes>
                <Route path="/" element={<Feed />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/Home" element={<Feed />}></Route>
                <Route path="/Vacations" element={<Vacations />}></Route>
                <Route path="/myVacations" element={<MyVacations />}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="/add" element={<AddVacation />}></Route>
                <Route path="/update" element={<UpdateVacation />}></Route>
                <Route path="/report" element={<Report />}></Route>

            </Routes>
        </div>
    )
}
