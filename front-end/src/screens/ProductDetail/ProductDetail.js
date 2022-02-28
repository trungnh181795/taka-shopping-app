import { Row, Col, Image } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Loader from "../../components/Loader";
import Message from "../../components/Message";
import ReviewItem from "../../components/ReviewItem";
import QuantityInput from "../../components/QuantityInput";

import { listProductDetails } from "../../actions/productActions";
import { cartAddItem } from "../../actions/cartActions";

import shoppingCart from "../../assets/shopping-cart.png";

import "./ProductDetail.scss";

const ProductDetail = () => {
  const params = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productDetail = useSelector((state) => state.productDetail);
  const { loading, product, reviews, error } = productDetail;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [quantity, setQuantity] = useState(1);
  const [imgSrc, setImgSrc] = useState("");
  const [isAlerted, setIsAlerted] = useState(false);

  const handleInputChange = (inputValue) => {
    setQuantity(inputValue);
  };

  const handleOnClick = (buttonType) => {
    if (userInfo && userInfo.isActive) {
      dispatch(cartAddItem(product, quantity));
      if(buttonType === "buy") navigate("/cart"); 
    } else {
      navigate("/signin");
    }
  };

  const changeAlertStatus = () => {
    setIsAlerted(prev => !prev);
    setTimeout(() => setIsAlerted(prev => !prev), 2000);
  }

  useEffect(() => {
    dispatch(listProductDetails(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    setImgSrc((prev) => (product.images ? product.images[0].url : prev));
  }, [product.images]);

  return (
    <>
      <div>
        <button
          className="btn-back my-2"
          type="button"
          onClick={() => navigate("/")}
        >
          {"< Back"}
        </button>
        {isAlerted ? (
          <Message variant="success">Added {quantity} item to your cart!</Message>
        ) : null}
      </div>
      <div className="product-detail">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <Row>
              <Col className="my-3 my-lg-0" xs={12} lg={5}>
                {imgSrc !== "" ? <Image src={imgSrc} fluid /> : null}
                {product.images ? (
                  product.images.map((image, index) => (
                    <Image
                      className={`product-detail-images`}
                      key={index}
                      src={image.url}
                      alt={`${index}`}
                      fluid
                      onClick={(e) => setImgSrc(e.target.src)}
                      onMouseEnter={(e) => setImgSrc(e.target.src)}
                    />
                  ))
                ) : (
                  <Message variant="warning">No image to show</Message>
                )}
              </Col>
              <Col className="my-3 my-lg-0" xs={12} lg={7}>
                <div className="product-brand mb-2">{product.brand}</div>
                <div className="product-name mb-2">{product.name}</div>
                <div className="d-flex">
                  <div className="product-stat">{`Rating: ${product.rating}/5`}</div>
                  <div className="product-stat">
                    Count in stock: {product.countInStock}
                  </div>
                </div>

                <div className="product-price my-3">$ {product.price}</div>
                <Row className="my-2">
                  <Col className="text-muted" sm lg={2}>
                    Description
                  </Col>
                  <Col className="product-description" sm lg={10}>
                    {product.description}                 
                  </Col>
                </Row>
                <Row className="my-2">
                  <Col className="text-muted" sm lg={2}>
                    Quantity
                  </Col>
                  <Col sm lg={10}>
                    <QuantityInput
                      defaultValue={quantity}
                      onInputChange={handleInputChange}
                    />
                  </Col>
                </Row>
                <div className="product-detail-footer justify-self-end">
                  <button
                    className="btn-add-to-cart mx-2"
                    type="button"
                    onClick={() => {
                        if(!isAlerted) {
                          handleOnClick("add_item");
                          changeAlertStatus();
                        }
                      }
                    }
                  >
                    <img
                      className="btn-add-to-cart-icon"
                      src={shoppingCart}
                      alt="cart"
                    />
                    <span className="mx-2">Add to cart</span>
                  </button>
                  <button
                    className="btn-buy mx-2"
                    type="button"
                    onClick={(e) => handleOnClick("buy")}
                  >
                    Buy now
                  </button>
                </div>
              </Col>
            </Row>
            <div className="product-reviews my-3">
              <div className="product-reviews-title">Reviews</div>
              <ul className="product-reviews-list">
                {reviews && reviews.result ? (
                  reviews.result.map((review, index) => (
                    <ReviewItem key={index} review={review} />
                  ))
                ) : (
                  <Message variant="warning">There is no review yet!</Message>
                )}
              </ul>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProductDetail;
