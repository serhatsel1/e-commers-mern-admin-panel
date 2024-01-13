import ReviewForm from "./ReviewForm";
import ReviewItem from "./ReviewItem";
import PropTypes from "prop-types";
import "./Reviews.css";
const Reviews = ({ active, productData, setProductData }) => {
  return (
    <div className={`tab-panel-reviews ${active}`}>
      <div className="comments">
        <ol className="comment-list">
          {productData?.singleProduct?.reviews.length > 0 ? (
            productData?.singleProduct?.reviews.map((review, i) => (
              <ReviewItem item={review} key={i} reviewItem={review} />
            ))
          ) : (
            <h3>Hiç yorum yapılmadı..</h3>
          )}
        </ol>
      </div>
      <div className="review-form-wrapper">
        <h2>Add a review</h2>
        <ReviewForm productData={productData} setProductData={setProductData} />
      </div>
    </div>
  );
};

export default Reviews;

Reviews.propTypes = {
  active: PropTypes.string,
  productData: PropTypes.object,
  setProductData: PropTypes.func,
};
