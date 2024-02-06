import { useEffect, useState } from "react";
import PorductItem from "./PorductItem";
import Slider from "react-slick";
import PropTypes from "prop-types";
import "./Products.css";
import { message, Spin } from "antd";

function NextBtn({ onClick }) {
  return (
    <button className="glide__arrow glide__arrow--right" onClick={onClick}>
      <i className="bi bi-chevron-right"></i>
    </button>
  );
}

NextBtn.propTypes = {
  onClick: PropTypes.func,
};

function PrevBtn({ onClick }) {
  return (
    <button className="glide__arrow glide__arrow--left" onClick={onClick}>
      <i className="bi bi-chevron-left"></i>
    </button>
  );
}
PrevBtn.propTypes = {
  onClick: PropTypes.func,
};
const Products = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchAllProducts = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/products`);
        if (res.ok) {
          const producdata = await res.json();
          setProducts(producdata);
        } else {
          return message.error("Ürünler getirlemedi !");
        }
      } catch (error) {
        console.log("FetchAllProducts", fetchAllProducts);
      } finally {
        setLoading(false);
      }
    };
    fetchAllProducts();
  }, [apiUrl]);
  console.log(products);
  const sliderSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextBtn />,
    prevArrow: <PrevBtn />,
    autoplaySpeed: 3000,
    autoplay: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="products">
      <div className="container">
        <div className="section-title">
          <h2>Featured Products</h2>
          <p>Summer Collection New Morden Design</p>
        </div>
        <div className="product-wrapper product-carousel">
          <Spin size="large" spinning={loading}>
            <div className="glide__track">
              <Slider {...sliderSettings}>
                {products?.products?.map((product) => (
                  <PorductItem key={product._id} productItem={product} />
                ))}
              </Slider>
            </div>
          </Spin>
          <div className="glide__arrows"></div>
        </div>
      </div>
    </section>
  );
};

export default Products;
