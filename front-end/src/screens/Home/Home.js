import ProductList from "../../components/ProductList";

import "./Home.scss";

const Home = () => {
    
  return (
    <div className="Home">
        <ProductList type="Trending" />
        <ProductList type="All Products" />
    </div>
  );
};

export default Home;
