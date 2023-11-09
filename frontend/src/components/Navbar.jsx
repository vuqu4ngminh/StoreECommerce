import React from 'react';
import { Link, useLocation } from 'react-router-dom'

function NavScroll() {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';
    const isRegisterPage = location.pathname === '/register';

    return (
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Mobile Ecommerce</a>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                 { !isLoginPage && !isRegisterPage  ? (
                <div className="collapse navbar-collapse" id="navbarCollapse">

                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        <li className="nav-item">
                            <Link to="/cart" className="nav-link">Giỏ Hàng</Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/login" className="nav-link">Tài khoản</Link>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-success" type="submit">Search</button>
                    </form>
                </div>
                ) : null}
            </div>
        </nav>
    );
}

export default NavScroll;