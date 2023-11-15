import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

function NavScroll() {
    const [id,setId] = useState(null)
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
                        <div class="d-lg-flex col-lg-3 justify-content-lg-end">
                            <Link class="btn btn-light" to="/login">Đăng nhập</Link>
                        </div>
                    ) : (
                        <div class="d-lg-flex col-lg-3 justify-content-lg-end" onClick={() => { localStorage.removeItem('id'); }}>
                            <Link class="btn btn-danger" to="/">Đăng xuất</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default NavScroll;