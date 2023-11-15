import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../../redux/reducers/cart-reducer';
import Table from 'react-bootstrap/Table';
import NavScroll from '../../components/Navbar';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.shoppingCart.cartItems);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <>
      <NavScroll />
      <div className='cart'>
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
              <td></td>
            </tr>
          </tfoot>
        </Table>
      </div>
    </>

  );
};

export default Cart;