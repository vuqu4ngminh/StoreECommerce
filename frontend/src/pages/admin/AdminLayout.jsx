import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';

const AdminLayout = () => {
    const navigate = useNavigate()
    const role = localStorage.getItem('role')
    useEffect(() => {
        if(role !== "admin"){
            navigate('/notfound')
        }
    },[role,navigate])
    return (
        <>
            <Outlet />
        </>
    )
}

export default AdminLayout