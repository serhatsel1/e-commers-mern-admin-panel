import { useState } from "react";

const ReviewForm = () => {
  const [starRating, setStarRating] = useState(5);

  const HandleStarRatingChange = (e, starValue) => {
    e.preventDefault();
    setStarRating(starValue);
  };
  return (
    <form className="comment-form">
      <p className="comment-notes">
        Your email address will not be published. Required fields are marked
        <span className="required">*</span>
      </p>
      <div className="comment-form-rating">
        <label>
          Your rating
          <span className="required">*</span>
        </label>
        <div className="stars">
          <a
            href="#"
            className={`star ${starRating === 1 && "active"}`}
            onClick={(e) => HandleStarRatingChange(e, 1)}
          >
            <i className="bi bi-star-fill"></i>
          </a>
          <a
            href="#"
            className={`star ${starRating === 2 && "active"}`}
            onClick={(e) => HandleStarRatingChange(e, 2)}
          >
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
          </a>
          <a
            href="#"
            className={`star ${starRating === 3 && "active"}`}
            onClick={(e) => HandleStarRatingChange(e, 3)}
          >
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
          </a>
          <a
            href="#"
            className={`star ${starRating === 4 && "active"}`}
            onClick={(e) => HandleStarRatingChange(e, 4)}
          >
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
          </a>
          <a
            href="#"
            className={`star ${starRating === 5 && "active"}`}
            onClick={(e) => HandleStarRatingChange(e, 5)}
          >
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
          </a>
        </div>
      </div>
      <div className="comment-form-comment form-comment">
        <label htmlFor="comment">
          Your review
          <span className="required">*</span>
        </label>
        <textarea id="comment" cols="50" rows="10"></textarea>
      </div>

      <div className="comment-form-cookies">
        <input id="cookies" type="checkbox" />
        <label htmlFor="cookies">
          Save my name, email, and website in this browser for the next time I
          comment.
          <span className="required">*</span>
        </label>
      </div>
      <div className="form-submit">
        <input type="submit" className="btn submit" />
      </div>
    </form>
  );
};

export default ReviewForm;
