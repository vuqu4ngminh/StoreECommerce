import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import CryptoJS from 'crypto-js';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavScroll from '../../components/Navbar';

const checkPhone = (phoneNumber) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phoneNumber);
}
const Register = () => {
    const navigate = useNavigate()
    const [message, setMessage] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('')
        const { data: user } = await axios.post(`http://localhost:8282/api/user/login`, {
            email: email,
            password: CryptoJS.MD5(password).toString()
        })
        if (user.length !== 0) {
            setMessage('Email đã được đăng ký')
        } else if (checkPhone(phone)) {
            await axios.post(`http://localhost:8282/api/user/add`, {
                name: name,
                phone: phone,
                email: email,
                address: "",
                password: CryptoJS.MD5(password).toString(),
                role: "user"
            })
            toast.success('Đăng ký thành công')
            setTimeout(() => {
                navigate('/login')
            }, 1000);
        } else {
            setMessage('Số điện thoại không đúng định dạng')
        }
    }
    return (
        <>
            <NavScroll />
            <div className='register'>
                <form className='form-signup w-100 m-auto' onSubmit={handleSubmit}>
                    <h1 class="h3 mb-3 fw-normal">SIGN UP</h1>
                    <div className='text-danger'>{message}</div>
                    <div class="form-floating">
                        <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} class="form-control" id="Name" required />
                        <label for="Name">Name</label>
                    </div>
                    <div class="form-floating">
                        <input type="text" value={phone} onChange={(e) => { setPhone(e.target.value) }} class="form-control" id="Phone" required />
                        <label for="Phone">Phone Number</label>
                    </div>
                    <div class="form-floating">
                        <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} class="form-control" id="Email" required />
                        <label for="Email">Email address</label>
                    </div>
                    <div class="form-floating">
                        <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} class="form-control" id="Password" required />
                        <label for="Password">Password</label>
                    </div>
                    <button class="btn btn-dark w-100 py-2" type="submit" >Regitster</button>
                    <span>Already have an account? <Link to="/login">Sign Up</Link>
                    </span>
                </form>
            </div>
        </>
    )
}

export default Register