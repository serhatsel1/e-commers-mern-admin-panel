import { useEffect, useState } from "react";
import "./Categories.css";

import CategoryItem from "./CategoryItem";
import { message, Spin } from "antd";

const Categories = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/categories`);

        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          message.error("Veri getirme başarısız.");
        }
      } catch (error) {
        console.log("Veri hatası:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [apiUrl]);
  console.log(categories);
  return (
    <section className="categories">
      <div className="container">
        <div className="section-title">
          <h2>All Categories</h2>
          <p>Summer Collection New Morden Design</p>
        </div>
        <Spin size="large" spinning={loading}>
          <ul className="category-list">
            {categories?.categories?.map((category) => (
              <CategoryItem key={category?._id} category={category} />
            ))}
          </ul>
        </Spin>
      </div>
    </section>
  );
};

export default Categories;
