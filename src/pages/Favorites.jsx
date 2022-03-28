import React from "react";
import Card from "../components/Card/Card";
import {AppContext} from '../App'

function Favorites() {

  const {favorites, onAddToFavorite, onAddToCart} = React.useContext(AppContext)

  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between ">
        <h1>Favorites</h1>
      </div>
      {/* end title */}
      <div className="d-flex flex-wrap">
        {favorites.map((e, index) => (
          <Card
            key={index}
            onFavorite={(obj) => onAddToFavorite(obj)}
            onPlus={(obj) => onAddToCart(obj)}
            favorited={true}
            {...e}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
