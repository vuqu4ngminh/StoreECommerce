import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavScroll from '../../components/Navbar';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserDetail = () => {
    const navigate = useNavigate()
    const id = localStorage.getItem('id')
    const [user, setUser] = useState([])
    const deleteUser = async () => {
        await axios.post(`http://localhost:8282/api/user/delete/${id}`)
        localStorage.removeItem('id')
        toast.success('Xóa Thành Công')
        setTimeout(() => window.location.reload(), 1500);
    }
    try {
        useEffect(() => {
            const fetchData = async (id) => {
                const { data: currentUser } = await axios.get(`http://localhost:8282/api/user/${id}`)
                setUser(currentUser)
            }
            fetchData(id)
        }, [id])

        return (
            <>
                <NavScroll />
                <div className="container py-5 mt-5">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card mb-4">
                                <div className="card-body text-center" style={{ paddingBottom: "7px" }}>
                                    <img src="/image/user.png" alt="avatar"
                                        className="rounded-circle img-fluid" style={{ width: "150px" }} />
                                    <h5 className="my-3">{user[0].name}</h5>
                                    <div className="d-flex justify-content-center mb-2">
                                        <button type="button" className="btn btn-danger ms-1" onClick={() => deleteUser()}>Đóng tài khoản</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Họ Và Tên</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{user[0].name}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Email</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{user[0].email}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Số điện thoại</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{user[0].phone}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Địa chỉ</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{user[0].address}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>

        )
    } catch (error) {
        navigate('/login')
    }
}

export default UserDetail