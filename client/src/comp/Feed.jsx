import React from 'react'
import AdminPage from './admin/AdminPage'
import Vacations from './Vacations'

export default function Feed() {
   
    return (
        <div>
            <h1 className='headline'>Vacation Website</h1>
            {
                 localStorage.isAdmin === "1" ? <AdminPage/> : <Vacations/>
            }
        </div>
    )
}
