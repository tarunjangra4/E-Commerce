import React,{ useContext, useState } from "react";
import LogoImg from "../img/main-logo.png";
import { Link } from "react-router-dom";
import CartWithItems from "./CartWithItems";
import EmptyCart from "./EmptyCart";
import { CartContext } from "../pages/ProductPage";
import "./Navbar.css";

function Navbar() {
  const [sticky, setSticky] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { cartItem } = useContext(CartContext);

  const handleScroll = () => {
    if (window.scrollY > 10) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  window.addEventListener("scroll", handleScroll);

  const openCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <nav className="navbar">
        <div className="container">
          <div className={`nav-container ${sticky ? "cont-sticky" : ""}`}>
            <Link to="/">
              <img
                width={"fit-content"}
                onClick={scrollToTop}
                src={LogoImg}
                alt="logo"
                className="logo-img"
              />
            </Link>
            <div className="nav-links">
              <Link onClick={() => window.scrollTo(0, 0)} to="/categories/all">
                categories
              </Link>
              <Link
                onClick={() => window.scrollTo(0, 0)}
                to="/categories/product/19"
              >
                product page
              </Link>
              <i
                data-array-length={cartItem.length}
                onClick={openCart}
                className={`fa-solid fa-cart-shopping ${
                  cartItem.length < 1 ? "cart-icon" : "cart-icon with-items"
                }`}
              ></i>
            </div>
            <div className="hamburger-menu">
              <i
                data-array-length={cartItem.length}
                onClick={openCart}
                className={`fa-solid fa-cart-shopping hamburger-cart ${
                  cartItem.length < 1 ? "cart-icon" : "cart-icon with-items"
                }`}
              ></i>
              <i
                onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
                className="fa-solid fa-bars hamburger-hamb"
              ></i>
            </div>
          </div>
        </div>
      </nav>

      {/* mobile nav bar */}
      <div
        className={`mobile-nav-full ${
          isMobileNavOpen ? "open-flex" : "closed-flex"
        }`}
      >
        <i
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          className="fa-sharp fa-solid fa-xmark"
        ></i>
        <div className="mobile-links">
          <Link
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            to="/categories/all"
          >
            categories
          </Link>
          <Link
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            to="/categories/lamps"
          >
            lamps
          </Link>
          <Link
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            to="/categories/product/19"
          >
            product page
          </Link>
        </div>
      </div>

      {/* overlay */}
      <div
        onClick={openCart}
        className={`page-overlay ${isCartOpen ? "open-flex" : "closed-flex"}`}
      ></div>

      {/* cart sidebar */}
      <div className={`cart-div ${isCartOpen ? "open-cart" : "closed-cart"}`}>
        <div className="cart-title-btn">
          <h2 className="cart-full-h2">
            Your Shopping Cart ({cartItem.length})
          </h2>
          <i onClick={openCart} className="fa-sharp fa-solid fa-xmark"></i>
        </div>

        <div className="cart-body">
          {cartItem.length < 1 ? (
            <EmptyCart openCart={openCart} />
          ) : (
            <CartWithItems />
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
