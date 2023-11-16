import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

const formatNumber = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const getDate = (date) => {
  let currentDate = new Date(date);
  return currentDate.toISOString().slice(0, 19).replace('T', ' ');
}
const Order = () => {
  const [orders, setOrders] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('http://localhost:8282/api/order')
      setOrders(res.data)
    }
    fetchData()
  }, [])
  const status = (status) => {
    if(status === 'open'){
      return "Chờ Thanh Toán"
    } else if(status === 'closed'){
      return "Đã Thanh Toán"
    } else {
      return "Đã Hủy"
    }
  }
  return (
    <div class="container">
      <h2 className='mt-5 mb-5'>Đơn Hàng</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Mã Đơn Hàng</th>
            <th>Tên Khách Hàng</th>
            <th>Tổng Giá Trị</th>
            <th>Tình Trạng</th>
            <th>Ngày Đặt Hàng</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.name}</td>
              <td>{formatNumber(order.total)}đ</td>
              <td>{status(order.status)}</td>
              <td>{getDate(order.orderDate)}</td>
              <td style={{ display: 'flex', justifyContent: 'center' }}>
                <Link to={`/admin/order/detail/${order.id}`} className='btn btn-primary'>Chi Tiết</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Order