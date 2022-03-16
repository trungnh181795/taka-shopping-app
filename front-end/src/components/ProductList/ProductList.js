import { Row, Col, Pagination } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import ProductItem from '../ProductItem';
import { listProducts  } from '../../actions/productActions';
import Loader from '../Loader';
import Message from '../Message';

import "./ProductList.scss";

const ProductList = ({ type }) => {
  const [pageNumber, setPageNumber] = useState(1);

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, currentPage, totalPages } = productList;

  const topRatedProducts = products.filter((product) => product.rating === "5");

  const list = type === "Trending" ? topRatedProducts : products;

  const paginationItems = [];
  if(!loading) {
    for (let number = 1; number <= totalPages; number++) {
      paginationItems.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => setPageNumber(number)}
        >
          {number}
        </Pagination.Item>
      )
    }
  }

  useEffect(() => {
    dispatch(listProducts(pageNumber))
  }, [dispatch, pageNumber])


  return (
    <div className="taka-white-frame py-3 px-4 my-3">
      <div className="taka-text-lg-bold mb-2">{type}</div>
      <div className="taka-products-list">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">Error</Message>
      ) : (
        <div className="d-flex flex-column">
          <Row>
            {list.map((product) => (
              <Col
                className="my-2"
                key={product.id}
                md={6} lg={3}
              >
                <ProductItem product={product} />
              </Col>
            ))}
          </Row>
          <Pagination className="mt-3 mx-auto">
            <Pagination.First />
            <Pagination.Prev />
              {paginationItems}
            <Pagination.Next />
            <Pagination.Last />
          </Pagination>
        </div>
      )}

      </div>
    </div>
  );
};

export default ProductList;
