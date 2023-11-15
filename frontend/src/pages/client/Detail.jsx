import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/reducers/cart-reducer';
import axios from 'axios';
import NavScroll from '../../components/Navbar';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Detail = () => {
  const location = useLocation()
  const dispatch = useDispatch();
  const id = location.pathname.split('/')[2];
  const [product, setProduct] = useState([])
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value, 10));
  };

  const handleAddToCart = () => {
    const newItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
    };

    dispatch(addToCart(newItem));
    toast.success(`Đã Thêm ${quantity} ${product.name} Vào Giỏ Hàng`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:8282/api/mobile/${id}`)
      setProduct(res.data[0])
    }
    fetchData()
  }, [id])
  const status = (status) => {
    if (status === "0") {
      return (
        <button
          className="btn btn-outline-dark flex-shrink-0"
          type="button"
          disabled
        >
          <i className="bi-cart-fill me-1"></i>
          Hết Hàng
        </button>
      )
    } else {
      return (
        <div className="d-flex">
          <input
            className="form-control text-center me-3"
            id="inputQuantity"
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
          />
          < button
            className="btn btn-outline-dark flex-shrink-0"
            type="button"
            onClick={handleAddToCart}
          >
            <i className="bi-cart-fill me-1"></i>
            Thêm vào giỏ hàng
          </button >
        </div>
      )
    }
  }
  return (
    <>
      <NavScroll />
      <div className="detail">
        <section className="py-5">
          <div className="container px-4 px-lg-5 my-5">
            <div className="row gx-4 gx-lg-5 align-items-center">
              <div className="col-md-6">
                <img className="card-img-top mb-5 mb-md-0" src={product.imageUrl} alt="..." />
              </div>
              <div className="col-md-6">
                <h1 className="display-5 fw-bolder">{product.name}</h1>
                <div className="fs-5 mb-5">
                  <span>{product.price}</span>
                </div>
                <p className="lead">{product.description}</p>
                {status(product.status)}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>

  );
};

export default Detail;
