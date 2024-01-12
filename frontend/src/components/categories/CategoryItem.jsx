import PropTypes from "prop-types";
import "./CategoryItem.css";

const CategoryItem = ({ category }) => {
  return (
    <li className="category-item">
      <a href="#">
        <img
          src={category.img}
          alt={category.name.toString()}
          className="category-image"
        />
        <span className="category-title">{category.name}</span>
      </a>
    </li>
  );
};

CategoryItem.propTypes = {
  category: PropTypes.object,
};
export default CategoryItem;
