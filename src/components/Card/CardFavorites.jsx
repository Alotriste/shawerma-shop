import React, { useState } from "react";
import styles from "./Card.module.scss";
function CardFavorites({id, onRemoveFavorite, imageUrl, title, price, onPlus }) {
  const [isAdded, setIsAdded] = useState(false);
  
  const onClickPlus = () => {
    onPlus({ imageUrl, title, price });
    setIsAdded((isAdded) => {
      return !isAdded;
    });
  };
  

  return (
    <div className={styles.card}>
      <div className={styles.favorite} onClick={()=>onRemoveFavorite(id)}>
        <img src="/img/btn-remove.svg" alt="remove" />
      </div>
      <div className="preview">
        <img width={160} height={120} src={imageUrl} alt="" />
      </div>
      <div className="title">
        <h5>{title}</h5>
      </div>

      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column ">
          <span className="opasity">Priсe:</span>
          <b>{price} руб.</b>
        </div>

        <img
          className={styles.plus}
          onClick={onClickPlus}
          src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
          alt="btn-plus"
        />
      </div>
    </div>
  );
}

export default CardFavorites;
