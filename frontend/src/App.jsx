import "./App.css";
import Footer from "./components/Layout/Footer/Footer";
import Header from "./components/Layout/Header/Header";
import Policy from "./components/Layout/Policy/Policy";
import Sliders from "./components/Sliders/Sliders";
import Categories from "./components/categories/categories";

function App() {
  return (
    <>
      <Header />
      <Sliders />
      <Categories />
      <Policy />
      <Footer />
    </>
  );
}

export default App;
