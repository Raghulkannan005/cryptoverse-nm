import React, { useState, useEffect } from "react";
import { Button, Typography, Avatar } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  HomeOutlined,
  FundOutlined,
  MenuOutlined,
  CloseOutlined,
  LineChartOutlined,
} from "@ant-design/icons";

import icon from "../assets/cryptocurrency.png";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 800) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" style={{ backgroundColor: "#6c5ce7" }} />
        <Typography.Title level={4} className="logo">
          <Link to="/">CryptoWatch</Link>
        </Typography.Title>
        <Button
          className="menu-control-container"
          onClick={() => setActiveMenu(!activeMenu)}
          icon={activeMenu ? <CloseOutlined /> : <MenuOutlined />}
        />
      </div>

      {activeMenu && (
        <ul className="menu">
          <li className={`menu-item ${isActive("/")}`}>
            <Link className="link" to="/">
              <HomeOutlined className="menu-icon" />
              Dashboard
            </Link>
          </li>
          <li className={`menu-item ${isActive("/cryptocurrencies")}`}>
            <Link className="link" to="/cryptocurrencies">
              <FundOutlined className="menu-icon" />
              Cryptocurrencies
            </Link>
          </li>
          <li className="menu-item">
            <a 
              className="link" 
              href="https://coinmarketcap.com/" 
              target="_blank" 
              rel="noreferrer"
            >
              <LineChartOutlined className="menu-icon" />
              Market Updates
            </a>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
