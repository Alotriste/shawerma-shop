import React, { useState } from "react";
import styles from "./Card.module.scss";
import ContentLoader from "react-content-loader";
import {AppContext} from '../../App'


function Card({
  onFavorite,
  imageUrl,
  title,
  price,
  onPlus,
  loading = false,
  favorited,
  id,
  
}) {
  const {isItemAdded} = React.useContext(AppContext)
  
  const [isFavorite, setIsFevorite] = useState(favorited);
  const onClickPlus = () => {
    onPlus({ imageUrl, title, price, id });
    
  };
  const onClickFavorite = () => {
    onFavorite({ imageUrl, title, price, id });
    setIsFevorite((isFavorite) => {
      return !isFavorite;
    });
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={0}
          width={150}
          height={187}
          viewBox="0 0 150 187"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="140" height="49" />
          <rect x="0" y="57" rx="4" ry="4" width="140" height="17" />
          <rect x="0" y="83" rx="4" ry="4" width="78" height="17" />
          <rect x="97" y="123" rx="4" ry="4" width="42" height="37" />
          <rect x="0" y="123" rx="4" ry="4" width="79" height="37" />
        </ContentLoader>
      ) : (
        <>
          <div className={styles.favorite} onClick={onClickFavorite}>
            <img
              src={
                isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"
              }
              alt="unliked"
            />
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
              src={isItemAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
              alt="btn-plus"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
