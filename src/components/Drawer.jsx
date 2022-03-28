import React from "react";
function Drawer({ offClickCard, items =[], onRemove}) {
  return (
    <div className="overlay-space">
      <div className="drawer">
        <h2 className="mb-20 d-flex justify-between">
          Cart
          <img
            onClick={offClickCard}
            className="removeBtn cu-p"
            src="/img/btn-remove.svg"
            alt="remove"
          />
        </h2>

        <div className="items">
          {items.map((obj) => (
            <div key={obj.id} className="cartItem d-flex align-center mb-20">
              <img
                
                className="mr-20"
                width={70}
                height={70}
                src={obj.imageUrl}
                alt="shawerma"
              />
              <div className="mr-20">
                <p>{obj.title}</p>
                <b>{obj.price} rub.</b>

                <img
                onClick={()=>onRemove(obj.id)}
                  className="removeBtn"
                  src="/img/btn-remove.svg"
                  alt="remove"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="cartTotalBlock">
          <ul>
            <li>
              <span>Total</span>
              <div></div>
              <b> 1029 руб.</b>
            </li>
            <li>
              <span>Tax:5%</span>
              <div></div>
              <b>52 руб.</b>
            </li>
          </ul>
          <button className="buy-btn">
            Check out order <img src="/img/arrow.svg" alt="arrow" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Drawer;
