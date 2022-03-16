import React, { useEffect, useLayoutEffect } from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
//import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {
  createProduct,
  listProducts,
  deleteProduct,
} from "../../actions/productActions";
import { useNavigate } from "react-router-dom";
import { PRODUCT_CREATE_RESET } from "../../constants/productConstants";
import Message from "../../components/Message";
import Loader from "../../components/Loader";

const Admin = () => {
  const pageNumber = 1;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useLayoutEffect(() => {
    if(!userInfo.username) navigate('/signin')
  })

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    // if (!userInfo || !userInfo?.data?.user?.role === "admin") {
    //   navigate("/signin");
    // }

    if (successCreate) {
      navigate("/admin/product/${createdProduct._id}/edit");
    } else {
      dispatch(listProducts(pageNumber));
    }
  }, [
    dispatch,
    userInfo,
    successDelete,
    successCreate,
    createProduct,
    pageNumber,
    navigate
  ]);

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>NAME</th>
                <th>PRICE</th>
                <th>COUNT IN STOCK</th>
                <th>BRAND</th>
                <th>CATEGORY</th>
                <th>DESCRIPTION</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.countInStock}</td>
                  <td>{product.brand}</td>
                  <td>{product.category}</td>
                  <td>{product.description}</td>
                  <td>{product.imageUrls}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product.id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default Admin;
