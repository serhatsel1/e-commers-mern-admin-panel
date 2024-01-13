import { useState } from "react";
import Reviews from "../../Reviews/Reviews";
import PropTypes from "prop-types";
import "./Tabs.css";

const Tabs = ({ productData, setProductData }) => {
  const [activeTab, setActiveTab] = useState("desc");

  const handleTabClick = (e, tab) => {
    e.preventDefault();
    setActiveTab(tab);
  };
  return (
    <div className="single-tabs">
      <ul className="tab-list">
        <li>
          <a
            href="#"
            className={`tab-button ${activeTab === "desc" && "active"} `}
            onClick={(e) => handleTabClick(e, "desc")}
          >
            Description
          </a>
        </li>
        <li>
          <a
            href="#"
            className={`tab-button ${activeTab === "info" && "active"} `}
            onClick={(e) => handleTabClick(e, "info")}
          >
            Additional information
          </a>
        </li>
        <li>
          <a
            href="#"
            className={`tab-button ${activeTab === "reviews" && "active"} `}
            data-id="reviews"
            onClick={(e) => handleTabClick(e, "reviews")}
          >
            Reviews
          </a>
        </li>
      </ul>
      <div className="tab-panel">
        <div
          className={`tab-panel-descriptions content ${
            activeTab === "desc" && "active"
          }`}
          id="desc"
          dangerouslySetInnerHTML={{
            __html: productData?.singleProduct?.description,
          }}
        ></div>
        <div
          className={`tab-panel-information ${
            activeTab === "info" ? "active" : ""
          }`}
          id="info"
        >
          <h3>Additional information</h3>
          <table>
            <tbody>
              <tr>
                <th>Color</th>
                <td>
                  <p>
                    Apple Red, Bio Blue, Sweet Orange, Blue, Green, Pink, Black,
                    White
                  </p>
                </td>
              </tr>
              <tr>
                <th>Size</th>
                <td>
                  <p>
                    {productData?.singleProduct?.sizes?.map((size, i) => (
                      <span key={i}>
                        {size.toUpperCase()}
                        {i < productData?.singleProduct?.sizes?.length - 1 &&
                          ", "}
                      </span>
                    ))}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Reviews
          active={activeTab === "reviews" ? "content active" : "content"}
          productData={productData}
          setProductData={setProductData}
        />
      </div>
    </div>
  );
};

Tabs.propTypes = {
  productData: PropTypes.object,
  setProductData: PropTypes.func,
};

export default Tabs;
