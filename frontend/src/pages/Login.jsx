import React from 'react'
import { Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
    
    return (
        <div className='login'>
            <form className='form-signin w-100 m-auto'>
                <h1 class="h3 mb-3 fw-normal">LOGIN</h1>

                <div class="form-floating">
                    <input type="email" className="form-control" name="Email" placeholder="name@example.com" required />
                    <label for="Email">Email address</label>
                </div>
                <div class="form-floating">
                    <input type="password" className="form-control" name="Password" placeholder="Password" required />
                    <label for="Password">Password</label>
                </div>
                <button class="btn btn-dark w-100 py-2" type="submit" >Sign In</button>
                <span>Don't have an account? <Link to="/register">Register</Link>
                </span>
            </form>
        </div>
    )
}

export default Login