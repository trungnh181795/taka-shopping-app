import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import ProductItem from '../ProductItem';
import { listProducts  } from '../../actions/productActions';
import Loader from '../Loader';
import Message from '../Message';

import "./ProductList.scss";

const ProductList = ({ type }) => {
  const pageNumber = 1;

  const dispatch = useDispatch();
    
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, currentPage, totalPages } = productList;

  const topRatedProducts = products.filter((product) => product.rating === "5");

  const list = type === "Trending" ? topRatedProducts : products;

  useEffect(() => {
    dispatch(listProducts(pageNumber))
  }, [dispatch, pageNumber])


  return (
    <div className="taka-products my-3">
      <div className="taka-products-title my-2">{type}</div>
      <div className="taka-products-list">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">Error</Message>
      ) : (
          <Row>
            {list.map((product) => (
              <Col 
                className="my-2"
                key={product.id} 
                xs={12} md={4} lg={2}
              >
                <ProductItem product={product} />
              </Col>
            ))}
          </Row>
      )}

      </div>
    </div>
  );
};

export default ProductList;