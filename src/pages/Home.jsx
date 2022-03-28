import React from "react";
import Card from "../components/Card/Card";


function Home({
  items,
  cardItems,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorite,
  onAddToCart,
  isLoading,
}) {
    
  const renderItem = () => {
    return (
      isLoading
        ? [...Array(10)]
        : items.filter((item) => item.title.toLowerCase().includes(searchValue))
    ).map((item, index) => (
      <Card
        key={index}
        {...item}
        
        onFavorite={(obj) => onAddToFavorite(obj)}
        onPlus={(obj) => onAddToCart(obj)}
        loading={isLoading}
      />
    ));
  };
  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between ">
        <h1>{searchValue ? `Menu: ${searchValue}` : "All menu"}</h1>
        <div className="search-block">
          <img src="/img/search.svg" alt="search" />
          {searchValue && (
            <img
              onClick={() => {
                setSearchValue("");
              }}
              className=" clear removeBtn cu-p"
              src="/img/btn-remove.svg"
              alt="remove"
            />
          )}
          <input
            onChange={onChangeSearchInput}
            value={searchValue}
            placeholder="Search..."
          />
        </div>
      </div>
      {/* end title */}
      <div className="d-flex flex-wrap">{renderItem()}</div>
    </div>
  );
}

export default Home;
