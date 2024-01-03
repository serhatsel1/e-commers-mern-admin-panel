
import Header from "../components/Layout/Header/Header";
import Sliders from "../components/Sliders/Sliders";
import Categories from "../components/categories/categories";
import Products from "../components/Products/Products";
import Campaigns from "../components/Campaigns/Campaigns";
import Blogs from "../components/Blog/Blogs";
import Brands from "../components/Brands/Brands";
import Policy from "../components/Layout/Policy/Policy";
import CampaignSingle from "../components/CampaignSingle/CampaignSingle";
import Footer from "../components/Layout/Footer/Footer";

const HomePage = () => {
  return (
    <>
      <Header />
      <Sliders />
      <Categories />
      <Products />
      <Campaigns />
      <Products />
      <Blogs />
      <Brands />
      <Policy />
      <CampaignSingle />
      <Footer />
    </>
  );
};

export default HomePage;
