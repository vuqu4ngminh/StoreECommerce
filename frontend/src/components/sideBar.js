import React, { Component } from 'react'
import { Link } from "react-router-dom";
import "../css/sideBar.css"

export class SideBar extends Component {
  render() {
    return (
      <nav
        id="sidebarMenu"
        className="collapse d-lg-block sidebar collapse bg-white"
        style={{paddingTop: "0px"}}
      >
        <div className="position-sticky">
          <div className="list-group list-group-flush mx-3 mt-4">
            <Link to={'/'} className="list-group-item list-group-item-action py-2 ripple active">
              <i className="fas fa-tachometer-alt fa-fw me-3"></i><span>Trang Chủ Admin</span>
            </Link>
            <Link to={'/'} className="list-group-item list-group-item-action py-2 ripple">
              <i class="fas fa-users fa-fw me-3"></i><span>Quản Lý Người Dùng</span>
            </Link>
            <Link to={'/mobile'} className="list-group-item list-group-item-action py-2 ripple">
              <i class="fas fa-users fa-fw me-3"></i><span>Quản Lý Sản Phẩm</span>
            </Link>
            <Link to={'/'} className="list-group-item list-group-item-action py-2 ripple">
              <i class="fas fa-users fa-fw me-3"></i><span>Quản Lý Đơn Hàng</span>
            </Link>
          </div>
        </div>
      </nav>
    )
  }
}

export default SideBar