import CampaignSingle from "../components/CampaignSingle/CampaignSingle";
import Footer from "../components/Layout/Footer/Footer";
import Header from "../components/Layout/Header/Header";
import Products from "../components/Products/Products";
import Categories from "../components/categories/categories";

const ShopPage = () => {
  return (
    <>
      <Header />
      <Categories />
      <Products />
      <CampaignSingle />
      <Products />
      <Footer />
    </>
  );
};

export default ShopPage;
