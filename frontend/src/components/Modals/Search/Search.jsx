import PropTypes from "prop-types";
import { message } from "antd";

import "./Search.css";
import { useState } from "react";

const Search = ({ isSearchShow, setIsSearchShow }) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [searchResults, setSearchResults] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const handleCloseModal = () => {
    setIsSearchShow(false);
    setSearchResults(null);
    setSearchValue("");
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    const productName = e.target[0].value;
    if (productName.trim().length === 0) {
      message.warning("Lütfen ürün adı giriniz !");
      return;
    }

    try {
      const res = await fetch(
        `${apiUrl}/api/products/search/${productName.trim()}`
      );

      if (!res.ok) {
        message.error("Ürün getirilemedi");
        return;
      }
      const resData = await res.json();
      setSearchResults(resData);
    } catch (error) {
      console.log("handleSearch-->", error);
    }
  };
  console.log(searchResults);
  return (
    <div className={`modal-search ${isSearchShow ? "show" : ""} `}>
      <div className="modal-wrapper">
        <h3 className="modal-title">Search for products</h3>
        <p className="modal-text">
          Start typing to see products you are looking for.
        </p>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search a product"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button>
            <i className="bi bi-search" />
          </button>
        </form>
        <div className="search-results">
          <div className="search-heading">
            <h3>RESULTS FROM PRODUCT</h3>
          </div>
          <div
            className="results"
            style={{
              display: `${
                searchResults?.products?.length === 0 ||
                !searchResults?.products
                  ? "flex"
                  : "grid"
              }`,
            }}
          >
            {!searchResults?.products && (
              <b
                className="result-item"
                style={{
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                Ürün Ara...
              </b>
            )}
            {searchResults?.products?.length === 0 && (
              <a
                href="#"
                className="result-item"
                style={{
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                😔Aradığınız Ürün Bulunamadı😔
              </a>
            )}{" "}
            {searchResults?.length > 0 &&
              searchResults?.products?.map((result) => (
                <a href="#" className="result-item" key={result._id}>
                  <img src={result.img[0]} className="search-thumb" alt="" />
                  <div className="search-info">
                    <h4>{result.name}</h4>
                    <span className="search-sku">res</span>
                    <span className="search-price">
                      ${result.price.current.toFixed(2)}
                    </span>
                  </div>
                </a>
              ))}
          </div>
        </div>
        <i
          className="bi bi-x-circle"
          id="close-search"
          onClick={handleCloseModal}
        />
      </div>
      <div className="modal-overlay" onClick={handleCloseModal}></div>
    </div>
  );
};

export default Search;

Search.propTypes = {
  isSearchShow: PropTypes.bool,
  setIsSearchShow: PropTypes.func,
};
