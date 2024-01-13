import PropTypes from "prop-types";

const ReviewItem = ({ reviewItem }) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Date(reviewItem.createdAt).toLocaleDateString(
    "tr-TR",
    options
  );
  return (
    <li className="comment-item">
      <div className="comment-avatar">
        <img src="/img/avatars/avatar1.jpg" alt="loading" />
      </div>
      <div className="comment-text">
        <ul className="comment-star">
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
        </ul>
        <div className="comment-meta">
          <strong>admin</strong>
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
