import React, { useState } from 'react'
import CryptoJS from 'crypto-js'
import { Link, useNavigate } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import NavScroll from '../../components/Navbar';
import axios from 'axios';

const Login = () => {
    const [message, setMessage] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('')
        const { data: user } = await axios.post(`http://localhost:8282/api/user/login`, {
            email: email,
            password: CryptoJS.MD5(password).toString()
        })
        if (user.length === 0) {
            setMessage('Email hoặc Mật khẩu không chính xác')
        } else {
            localStorage.setItem("id", user[0].id);
            if(user[0].role === "admin"){
                localStorage.setItem('role', "admin")
                navigate('/admin/mobile')
            } else {
                navigate('/profile')
            }
        }
    }
    return (
        <>
            <NavScroll />
            <div className='login'>
                <form className='form-signin w-100 m-auto' onSubmit={handleSubmit}>
                    <h1 className="h3 mb-3 fw-normal">LOGIN</h1>
                    <div className='text-danger'>{message}</div>
                    <div className="form-floating">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                            required
                        />
                        <label for="Email">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                            required
                        />
                        <label for="Password">Password</label>
                    </div>
                    <button className="btn btn-dark w-100 py-2" type="submit">Log In</button>
                    <span>Don't have an account? <Link to="/register">Register</Link>
                    </span>
                </form>
            </div>
        </>
    )
}

export default Login