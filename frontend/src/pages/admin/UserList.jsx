import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';

const UserList = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get('http://localhost:8282/api/user')
            setUsers(res.data)
        }
        fetchData()
    },[])
    return (
        <div className='adminPage'>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th><Button variant="success">Add User</Button></th>
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
                                <Button variant="primary">Edit</Button>{' '}
                                <Button variant="danger">Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default UserList;