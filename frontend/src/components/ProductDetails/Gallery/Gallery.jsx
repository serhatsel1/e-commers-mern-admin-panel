import { useState } from "react";
import productsData from "../../../data.json";
import "./Gallery.css";

const Gallery = () => {
  const [activeİmage, setActiveİmage] = useState(
    productsData[0].img.singleImage
  );
  const [show, setShow] = useState(0);

  const slideRightHandle = () => {
    setShow((prevState) => (prevState + 1) % 3);
  };

  const slideLeftHandle = () => {
    setShow((prevState) => (prevState - 1 + 3) % 3);
  };
  console.log(productsData);
  return (
    <div className="product-gallery">
      <div className="single-image-wrapper">
        <img src={activeİmage} id="single-image" alt="" />
      </div>
      <div className="product-thumb">
        <div className="glide__track" data-glide-el="track">
          <ol className="gallery-thumbs glide__slides">
            {productsData[0].img.thumbs.map((product, i) => (
              <li
                key={i}
                onClick={() => setActiveİmage(product)}
                className="glide__slide glide__slide--active"
              >
                <img
                  src={`${product}`}
                  alt=""
                  className={`img-fluid ${product === activeİmage && "active"}`}
                />
              </li>
            ))}
          </ol>
        </div>
        <div className="glide__arrows" data-glide-el="controls">
          <button
            className="glide__arrow glide__arrow--left"
            data-glide-dir="<"
            onClick={slideLeftHandle}
          >
            <i className="bi bi-chevron-left"></i>
          </button>
          <button
            className="glide__arrow glide__arrow--right"
            data-glide-dir=">"
            onClick={slideRightHandle}
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
