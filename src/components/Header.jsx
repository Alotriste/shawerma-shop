import React from "react";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="d-flex justify-between align-centr p-40">
      <Link to='/'>
      <div className="headerLeft d-flex align-center">
        <img width={40} height={40} src="/img/logo.png" alt="logo" />
        <div className="headerInfo">
          <h3>React Shope</h3>
          <p className="opasity">shope the best shawerma</p>
        </div>
      </div>
      </Link>
      
      
      
      <ul className="headerRight d-flex cu-p">
        <li className="mr-20">
          <img  onClick={props.onClickCard} src="/img/cart.svg" alt="cart" />
          <span className="ml-10">1205 руб.</span>
        </li>
        <li className="mr-20">
          <Link to='/favorites'>
          <img src="/img/heart.svg" alt="heart" />
          </Link>
          
          
          
        </li>
        <li>
          <img src="/img/user.svg" alt="user" />
        </li>
      </ul>
    </header>
  );
}

export default Header;
