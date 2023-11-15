import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

function NavScroll() {
    const navigate = useNavigate()
    const [id,setId] = useState(null)
    const login = () => {
        navigate('/login')
    }
    const logout = () => {
        localStorage.removeItem('id');
        navigate('/')
        window.location.reload();
    }
    useEffect(() => {
        setId(localStorage.getItem('id'))
    },[])
    
    return (
        <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <div class="container-fluid">
                <div class="collapse navbar-collapse d-lg-flex" id="navbarCollapse">
                    <a class="navbar-brand col-lg-3 me-0" href="/">Mobile Ecommerce</a>
                    <ul class="navbar-nav col-lg-6 justify-content-lg-center">
                        <li class="nav-item">
                            <Link to="/" className="nav-link">Trang Chủ</Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/cart" className="nav-link">Giỏ Hàng</Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/profile" className="nav-link">Tài khoản</Link>
                        </li>
                    </ul>
                    {!id ? (
                        <div class="d-lg-flex col-lg-3 justify-content-lg-end" onClick={login}>
                            <button class="btn btn-light">Đăng nhập</button>
                        </div>
                    ) : (
                        <div class="d-lg-flex col-lg-3 justify-content-lg-end" onClick={logout}>
                            <button class="btn btn-danger">Đăng xuất</button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default NavScroll;