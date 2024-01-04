import { useState } from "react";
import PropTypes from "prop-types"; // Doğru import
import Footer from "../components/Layout/Footer/Footer";
import Header from "../components/Layout/Header/Header";
import Search from "../components/Modals/Search/Search";
import Dialog from "../components/Modals/Dialog/Dialog";

const MainLayout = ({ children }) => {
  const [isSearchShow, setIsSearchShow] = useState(false);
  return (
    <div className="main-layout">
      <Dialog />
      <Search isSearchShow={isSearchShow} setIsSearchShow={setIsSearchShow} />
      <Header setIsSearchShow={setIsSearchShow} />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;

MainLayout.propTypes = {
  children: PropTypes.node,
};
