import { useState } from "react";
import PropTypes from "prop-types";
import { message } from "antd";

const ReviewForm = ({ productData }) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const [starRating, setStarRating] = useState(5);
  const [review, setReview] = useState("");
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  // console.log("user", user);
  const HandleStarRatingChange = (e, starValue) => {
    e.preventDefault();
    setStarRating(starValue);
  };
  // console.log(review);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      reviews: [
        ...productData.singleProduct.reviews,
        {
          text: review,
          rating: parseInt(starRating),
          user: user._id,
        },
      ],
    };

    try {
      const res = await fetch(
        `${apiUrl}/api/products/${productData?.singleProduct?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (res.ok) {
        const resData = await res.json();
        message.success("Başarıyla güncellendi");
        setReview("");
        setStarRating(0);

        // console.log("resData", resData);
      } else {
        message.error("Güncelleme başarısız");
      }
    } catch (error) {
      console.error("handleSubmit-->", error);
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
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
        <textarea
          id="comment"
          cols="50"
          rows="10"
          onChange={(e) => setReview(e.target.value)}
          value={review}
        ></textarea>
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

ReviewForm.propTypes = {
  productData: PropTypes.object,
};

export default ReviewForm;
