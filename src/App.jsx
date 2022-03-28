import React from "react";
import axios from "axios";
import "./app.scss";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

export const AppContext = React.createContext({})

function App() {
  const [items, setItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [cardItems, setCardItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const cartResponse = await axios.get(
        "https://622f12cf3ff58f023c14f4c4.mockapi.io/cart"
      );
      const favoritsResponse = await axios.get(
        "https://622f12cf3ff58f023c14f4c4.mockapi.io/favorites"
      );
      const itemResponse = await axios.get(
        "https://622f12cf3ff58f023c14f4c4.mockapi.io/items"
      );
      setIsLoading(false);
      setCardItems(cartResponse.data);
      setFavorites(favoritsResponse.data);
      setItems(itemResponse.data);
    }
    fetchData();
  }, []);
  // disable scroll when open Drawer//////////////////////////////
  React.useEffect(()=>{
    const bodyOverflowHidden = () => {
      const elementBody = document.querySelector("body");
      if (cartOpened) {
        return (elementBody.style.overflow = "hidden");
      } else {
        return (elementBody.style.overflow = "visible");
      }
    };
    bodyOverflowHidden()}, [cartOpened]);
  //////////////////////////////////////////////////////////////////
  const onRemoveItem = (id) => {
    console.log(id);

    axios.delete(`https://622f12cf3ff58f023c14f4c4.mockapi.io/cart/${id}`);
    setCardItems((prev) => prev.filter((items) => items.id !== id));
  };

  const onAddToCart = (obj) => {
    if (cardItems.find((item) => Number(item.id) === Number(obj.id))) {
      axios.delete(
        `https://622f12cf3ff58f023c14f4c4.mockapi.io/cart/${obj.id}`
      );
      setCardItems((prev) =>
        prev.filter((f) => Number(f.id) !== Number(obj.id))
      );
    } else {
      axios.post("https://622f12cf3ff58f023c14f4c4.mockapi.io/cart", obj);
      setCardItems((prev) => [...prev, obj]);
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((f) => f.id === obj.id)) {
        axios.delete(
          `https://622f12cf3ff58f023c14f4c4.mockapi.io/favorites/${obj.id}`
        );
        setFavorites((prev) => prev.filter((items) => items.id !== obj.id));
      } else {
        const { data } = await axios.post(
          "https://622f12cf3ff58f023c14f4c4.mockapi.io/favorites",
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("could't add to favorites");
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(() => event.target.value);
  };

const isItemAdded = (id)=>{
  return cardItems.some((obj) => Number(obj.id) === Number(id))
}


  return (
    <AppContext.Provider value={{cardItems, favorites, items, isItemAdded, onAddToFavorite, onAddToCart}}>
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer
          onRemove={onRemoveItem}
          items={cardItems}
          offClickCard={() => {
            setCartOpened(false);
          }}
        />
      )}
      <Header
        onClickCard={() => {
          setCartOpened(true);
        }}
      />

      <Routes>
        <Route
          exect
          path="/"
          element={
            <Home
              cardItems={cardItems}
              items={items}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
              isLoading={isLoading}
            />
          }
        />
        <Route
          exect
          path="/favorites"
          element={
            <Favorites />
          }
        />
      </Routes>
      {/* end header */}
    </div>
  </AppContext.Provider>  
  );
}

export default App;
