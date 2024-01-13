import PropTypes from "prop-types";

const ReviewItem = ({ reviewItem }) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Date(reviewItem.createdAt).toLocaleDateString(
    "tr-TR",
    options
  );
  // console.log("reviewItem", reviewItem);
  return (
    <li className="comment-item">
      <div className="comment-avatar">
        <img
          style={{ width: "60px" }}
          src={reviewItem.user.avatar}
          alt="loading"
        />
      </div>
      <div className="comment-text">
        <ul className="comment-star">
          {Array.from({ length: reviewItem.rating }, (_, i) => {
            return (
              <li key={i}>
                <i className="bi bi-star-fill"></i>
              </li>
            );
          })}
        </ul>
        <div className="comment-meta">
          <strong>{reviewItem.user.name}</strong>
          <span>-</span>
          <time>{formattedDate}</time>
        </div>
        <div className="comment-description">
          <p>{reviewItem?.text}</p>
        </div>
      </div>
    </li>
  );
};

ReviewItem.propTypes = {
  reviewItem: PropTypes.object,
};

export default ReviewItem;
