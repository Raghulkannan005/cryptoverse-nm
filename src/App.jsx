import { Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import { Navbar, CryptoDetails, Cryptocurrencies, Home } from "./components";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>

      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route element={<Cryptocurrencies />} path="/cryptocurrencies" />
              <Route element={<CryptoDetails />} path="/crypto/:coinId" />
            </Routes>
          </div>
        </Layout>

        <div className="footer">
          <h1 className="footer-heading">
            CryptoWatch — Modern Cryptocurrency Dashboard
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "14px", marginTop: "5px" }}>
            © {new Date().getFullYear()} All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;