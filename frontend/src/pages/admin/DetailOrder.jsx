import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const formatNumber = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const DetailOrder = () => {
  const { orderId } = useParams()
  const [order, setOrder] = useState({})
  const [list, setList] = useState([])
  useEffect(() => {
    const getDetail = async () => {
      const res = await axios.get(`http://localhost:8282/api/order/detail/${orderId}`)
      setOrder(res.data[0])
    }
    const getList = async () => {
      const res = await axios.get(`http://localhost:8282/api/order/${orderId}`)
      setList(res.data)
    }
    getDetail()
    getList()
  }, [orderId])
  const checkStatus = (status) => {
    if (status === "aborted") {
      return (
        <h3 class="text-danger fw-bold">Đơn hàng đã bị hủy</h3>
      )
    } else if (status === "closed") {
      return (
        <h3 class="text-success fw-bold">Đơn hàng đã được thanh toán</h3>
      )
    }
  }
  const cancel = async (id) => {
    await axios.post(`http://localhost:8282/api/order/${id}`, {
      status: 'aborted'
    })
    window.location.reload()
  }
  const confirm = async (id) => {
    await axios.post(`http://localhost:8282/api/order/${id}`, {
      status: 'closed'
    })
    window.location.reload()
  }
  return (
    <div class="container">
      <div class="row">
        <div class="header-laptop mt-5 d-flex justify-content-between">
          <h3>Đơn hàng {orderId}</h3>
          <Link class="btn btn-danger" to={"/admin/order"}>Quay Lại</Link>
        </div>
        <div class="mt-3 col-7">
          <div class="mt-3 d-flex justify-content-between">
            <h5>Tên Khách Hàng:</h5>
            <p>{order.name}</p>
          </div>
          <div class="mt-3 d-flex justify-content-between">
            <h5>Số Điện Thoại:</h5>
            <p>{order.phone}</p>
          </div>
          <div class="mt-3 d-flex justify-content-between">
            <h5>Địa Chỉ Nhận Hàng:</h5>
            <p>{order.address}</p>
          </div>
          <div class="mt-3 d-flex justify-content-between">
            <h5>Tổng Giá Trị Đơn Hàng:</h5>
            <p>{formatNumber(String(order.total))}đ</p>
          </div>
          <div class="mt-5">
            <h5>Danh Sách Chi tiết:</h5>
          </div>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Tên Sản Phẩm</th>
              <th scope="col">Số Lượng</th>
              <th scope="col">Thành Tiền</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.amount}</td>
                <td>{formatNumber(String(item.total))}đ</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div class="mt-3">
          {order.status === "open" ? (
            <div class="d-flex justify-content-between">
              <button type="submit" class="btn btn-danger" onClick={() => cancel(orderId)}>Hủy Đơn Hàng</button>
              <button type="submit" class="btn btn-success" onClick={() => confirm(orderId)}>Xác Nhận Đã Thanh Toán</button>
            </div>
          ) : null}
        </div>
        {checkStatus(order.status)}
      </div>
    </div>
  )
}

export default DetailOrder