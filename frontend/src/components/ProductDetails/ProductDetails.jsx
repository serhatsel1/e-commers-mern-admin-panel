import Breadcrumb from "./Breadcrumb/Breadcrumb";
import Gallery from "./Gallery/Gallery";
import Info from "./Info/Info";
import "./ProductDetails.css";
import Tabs from "./Tabs/Tabs";

const ProductDetails = ({productData}) => {
  return (
    <section className="single-product">
      <div className="container">
        <div className="single-product-wrapper">
          <Breadcrumb />

          <div className="single-content">
            <main className="site-main">
              <Gallery productData={productData}/>
              <Info productData={productData} />
            </main>
          </div>

          <Tabs />
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
