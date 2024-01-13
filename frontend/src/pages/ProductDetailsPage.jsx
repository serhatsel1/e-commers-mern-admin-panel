import { useEffect, useState } from "react";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import { useParams } from "react-router-dom";

const ProductDetailsPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const { id: productId } = useParams();
  const [productData, setProductData] = useState(null);
  // const params = useParams();
  // const productId = params.id;
  // console.log(productId);

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/products/${productId}`);

        if (res.ok) {
          const resData = await res.json();
          setProductData(resData);
        }
      } catch (error) {
        console.log("FetchSingleProduct", error);
      }
    };

    fetchSingleProduct();
  }, [apiUrl]);
  return (
    <>
      { productData ? <ProductDetails productData={productData} 
      setProductData={setProductData} /> : <p>Ürün yükleniyor</p>}
    </>
  );
};

export default ProductDetailsPage;
