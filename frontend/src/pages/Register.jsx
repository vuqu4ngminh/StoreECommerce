import React from 'react'
import { Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";


const Register = () => {

    return (
        <div className='register'>
            <form className='form-signup w-100 m-auto'>
                <h1 className="h3 mb-3 fw-normal">SIGN UP</h1>

                <div className="form-floating">
                    <input type="text" className="form-control" id="Name" required />
                    <label for="Name">Name</label>
                </div>
                <div className="form-floating">
                    <input type="text" className="form-control" id="Phone" required />
                    <label for="Phone">Phone Number</label>
                </div>
                <div className="form-floating">
                    <input type="text" className="form-control" id="Address" required />
                    <label for="Address">Address</label>
                </div>
                <div className="form-floating">
                    <input type="email" className="form-control" id="Email" required />
                    <label for="Email">Email address</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="Password" required />
                    <label for="Password">Password</label>
                </div>
                <button className="btn btn-dark w-100 py-2" type="submit" >Regitster</button>
                <span>Already have an account? <Link to="/login">Sign Up</Link>
                </span>
            </form>
        </div>
    )
}

export default Register