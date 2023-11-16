import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, clearCart } from '../../redux/reducers/cart-reducer';
import Table from 'react-bootstrap/Table';
import { Link, useNavigate } from "react-router-dom"
import NavScroll from '../../components/Navbar';
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.shoppingCart.cartItems);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleSubmitCart = async (e) => {
    e.preventDefault()
    const userId = localStorage.getItem('id')
    if(userId){
      try {
        await axios.post(`http://localhost:8282/api/order/add`, { 
          cartItems: cartItems,
          total: calculateTotal(),
          userId: Number(userId)
        })
        dispatch(clearCart())
        toast.success('Đặt hàng thành công')
      } catch (error) {
        console.log(error)
      }
    } else {
      navigate('/login')
    }
  }
  return (
    <>
      <NavScroll />
      <div className='cart'>
        {cartItems.length === 0 ? (
          <div className='noItem'>
            <i class="bi bi-bag-x"></i>
            <p>Không có sản phẩm nào trong giỏ hàng.</p>
            <Link className='btn btn-outline-success' to='/'>Tiếp tục mua sắm</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmitCart}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th style={{ display: 'flex', justifyContent: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price * item.quantity}</td>
                    <td style={{ display: 'flex', justifyContent: 'center' }}>
                      <div >
                        <button className='btn btn-outline-danger' onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan='3'></td>
                  <td>Total:</td>
                  <td>{calculateTotal()}</td>
                </tr>
              </tfoot>
            </Table>
            <button className="btn btn-dark w-100 py-2" type="submit">Xác nhận</button>
          </form>
        )}
      </div>
    </>
  );
};

export default Cart;