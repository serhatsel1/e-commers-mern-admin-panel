import { useEffect, useState } from "react";
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

const Gallery = ({ productData }) => {
  const [activeİmage, setActiveİmage] = useState(
    productData?.singleProduct?.img[0]
    // ""
  );
  useEffect(() => {
    // 'productData' değiştiğinde çalışacak kod buraya gelecek
    setActiveİmage(productData?.singleProduct?.img[0]);
  }, [productData]);
  const sliderSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextBtn />,
    prevArrow: <PrevBtn />,
  };

  console.log(activeİmage);
  // console.log(imgLinks)
  return (
    <div className="product-gallery">
      <div className="single-image-wrapper">
        <img
          style={{ minHeight: "450px", maxHeight: "600px" }}
          src={activeİmage}
          id="single-image"
          alt="loading"
        />
      </div>
      <div className="product-thumb">
        <div className="glide__track" data-glide-el="track">
          <ol className="gallery-thumbs glide__slides">
            <Slider {...sliderSettings}>
              {productData?.singleProduct?.img?.map((product, i) => (
                <li
                  key={i}
                  onClick={() => setActiveİmage(product)}
                  className="glide__slide glide__slide--active"
                >
                  <img
                    style={{ height: "160px" }}
                    src={`${product}`}
                    alt="loading"
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

Gallery.propTypes = {
  productData: PropTypes.object,
};

export default Gallery;
