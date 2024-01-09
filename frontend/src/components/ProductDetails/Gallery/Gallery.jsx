import { useState } from "react";
import productsData from "../../../data.json";
import Slider from "react-slick";
import PropTypes from "prop-types";
import "./Gallery.css";

function NextBtn({ onClick }) {
  return (
    <button
      className="glide__arrow glide__arrow--right"
      data-glide-dir=">"
      onClick={onClick}
      style={{
        zIndex: "2",
      }}
    >
      <i className="bi bi-chevron-right"></i>
    </button>
  );
}

NextBtn.propTypes = {
  onClick: PropTypes.func,
};

function PrevBtn({ onClick }) {
  return (
    <button
      className="glide__arrow glide__arrow--left"
      data-glide-dir="<"
      onClick={onClick}
      style={{
        zIndex: "2",
      }}
    >
      <i className="bi bi-chevron-left"></i>
    </button>
  );
}
PrevBtn.propTypes = {
  onClick: PropTypes.func,
};

const Gallery = () => {
  const [activeİmage, setActiveİmage] = useState(
    productsData[0].img.singleImage
  );
  const [show, setShow] = useState(0);

  const sliderSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextBtn />,
    prevArrow: <PrevBtn />,
  };
  // const slideRightHandle = () => {
  //   setShow((prevState) => (prevState + 1) % 3);
  // };

  // const slideLeftHandle = () => {
  //   setShow((prevState) => (prevState - 1 + 3) % 3);
  // };
  // console.log(productsData);
  return (
    <div className="product-gallery">
      <div className="single-image-wrapper">
        <img src={`/${activeİmage}`} id="single-image" alt="" />
      </div>
      <div className="product-thumb">
        <div className="glide__track" data-glide-el="track">
          <ol className="gallery-thumbs glide__slides">
            <Slider {...sliderSettings}>
              {productsData[0].img.thumbs.map((product, i) => (
                <li
                  key={i}
                  onClick={() => setActiveİmage(product)}
                  className="glide__slide glide__slide--active"
                >
                  <img
                    src={`/${product}`}
                    alt=""
                    className={`img-fluid ${
                      product === activeİmage && "active"
                    }`}
                  />
                </li>
              ))}
            </Slider>
          </ol>
        </div>
        <div className="glide__arrows" data-glide-el="controls"></div>
      </div>
    </div>
  );
};

export default Gallery;
