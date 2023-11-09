import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { Link } from "react-router-dom";

const Home = () => {
    const [data, setData] = useState([]);
    const fetchData = async () => {
        try {
            const { data: response } = await axios.get(`${process.env.REACT_APP_API_URL}mobile/`);
            setData(response);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="home">
            <section className="py-5 text-center container">
                <div className="row py-lg-5 bg-light">
                    <div className="col-lg-6 col-md-8 mx-auto">
                        <h1 className="fw-light">IPHONE 15</h1>
                        <p className="lead text-body-secondary"> <b>A16 Bionic</b> tăng cường sức mạnh cho các tính năng tiên tiến. <b>Cùng thiết kế mới đầy sáng tạo</b> sử dụng mặt lưng kính được pha màu xuyên suốt toàn bộ chất liệu.</p>
                        <p>
                            <Link className="btn btn-secondary my-2" to='/'>COMING SOON</Link>
                        </p>
                    </div>
                </div>
            </section>

            <div className="product-list">
                {data.map((product) => (
                    <div key={product.id} className="product-card">
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={product.imageUrl} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>{product.price}</Card.Text>
                                <form className="btn-form">
                                    <Link className="btn btn-warning" to={`/detail/${product.id}`}>Chi tiết</Link>
                                    {product.status === 0 ? (
                                        <div>
                                            <Button variant="danger" disabled>Hết hàng</Button>
                                        </div>
                                    ) : (
                                        <div>
                                            <Button variant="dark">Mua</Button>
                                        </div>
                                    )}
                                </form>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>

            <div className="row mb-2">
                <div className="col-md-6">
                    <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                        <div className="col p-4 d-flex flex-column position-static">
                            <strong className="d-inline-block mb-2 text-primary-emphasis">NEW</strong>
                            <h3 className="mb-0">IPhone 15</h3>
                            <div className="mb-1 text-body-secondary">Sep 13</div>
                            <p className="card-text mb-auto">Với màn chào sân đầy ấn tượng của iPhone 15, series lần này được nhiều người đánh giá là một đột phá lớn.</p>
                            <a href="/" className="icon-link gap-1 icon-link-hover stretched-link">
                                Continue reading
                            </a>
                        </div>
                        <div className="col-auto d-none d-lg-block">
                            <img className="bd-placeholder-img" width="250" height="250" src="https://cdn.tgdd.vn/Products/Images/42/303716/iphone-15-256gb-den-3.jpg" alt="" />
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                        <div className="col p-4 d-flex flex-column position-static">
                            <strong className="d-inline-block mb-2 text-primary-emphasis">NEW</strong>
                            <h3 className="mb-0">IPhone 15</h3>
                            <div className="mb-1 text-body-secondary">Sep 13</div>
                            <p className="card-text mb-auto">Với màn chào sân đầy ấn tượng của iPhone 15, series lần này được nhiều người đánh giá là một đột phá lớn.</p>
                            <a href="/" className="icon-link gap-1 icon-link-hover stretched-link">
                                Continue reading
                            </a>
                        </div>
                        <div className="col-auto d-none d-lg-block">
                            <img className="bd-placeholder-img" width="250" height="250" src="https://cdn.tgdd.vn/Products/Images/42/303716/iphone-15-256gb-den-3.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home