import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom';

const User = () => {
    const [users, setUsers] = useState([])
    const deleteUser = async (id) => {
        await axios.post(`http://localhost:8282/api/user/delete/${id}`)
        toast.success('Xóa Thành Công')
        setTimeout(() => window.location.reload(), 1500);
    }
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get('http://localhost:8282/api/user')
            setUsers(res.data)
        }
        fetchData()
    }, [])
    return (
        <div className='container'>
            <h2 className='mt-5 mb-5'>Người Dùng</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th className='d-flex justify-content-center'><Link to={'/admin/user/add'} className='btn btn-success'>Add User</Link></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.address}</td>
                            <td style={{ display: 'flex', justifyContent: 'center' }}>
                                <Link to={`/admin/user/update/${user.id}`} className='btn btn-primary'>Edit</Link>{' '}
                                <Button onClick={() => deleteUser(user.id)} variant="danger">Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default User;