import { Row, Col, Image } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Review from "../../components/Review";
import QuantityInput from "../../components/QuantityInput";
import Rating from "../../components/Rating";

import { listProductDetails } from "../../actions/productActions";
import { cartAddItem } from "../../actions/cartActions";
import { checkImgUrl } from "../../utilities/checkImgUrl";

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
      if (buttonType === "buy") navigate("/cart");
    } else {
      navigate("/signin");
    }
  };

  const changeAlertStatus = () => {
    setIsAlerted((prev) => !prev);
    setTimeout(() => setIsAlerted((prev) => !prev), 2000);
  };

  useEffect(() => {
    dispatch(listProductDetails(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    setImgSrc((prev) => (product.images ? product.images[0].url : prev));
  }, [product.images]);

  return (
    <>
      <div className="my-3">
        <button
          className="btn-back"
          type="button"
          onClick={() => navigate("/")}
        >
          {"< Back"}
        </button>
        {isAlerted ? (
          <Message variant="success">
            Added {quantity} item to your cart!
          </Message>
        ) : null}
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <div className="taka-white-frame px-3 py-3 my-3">
            <Row className="my-2">
              <Col className="my-3 my-lg-0" xs={12} lg={5}>
                {checkImgUrl(imgSrc) ? <Image className="mb-2" src={imgSrc} fluid /> : null}

                {product.images ? (
                  product.images.map((image, index) => {
                    if(checkImgUrl(image.url)) {
                      return (
                        <Image
                          className={`product-images me-1`}
                          key={index}
                          src={image.url}
                          alt={`${index}`}
                          fluid
                          onClick={(e) => setImgSrc(e.target.src)}
                          onMouseEnter={(e) => setImgSrc(e.target.src)}
                        />
                      )
                    }
                    return <Message key={index} variant="warning">No image to show</Message>
                  })
                ) : (
                  <Message variant="warning">No image to show</Message>
                )}
              </Col>
              <Col className="my-3 my-lg-0" md={12} lg={7}>
                <div className="product-brand taka-text-sm-bold mb-2">
                  {product.brand}
                </div>
                <div className="taka-text-lg-bold mb-2">{product.name}</div>
                <div className="d-flex">
                  <Rating value={product.rating} />
                  <div className="taka-text-sm-normal ms-2 pe-4">
                    Count in stock: {product.countInStock}
                  </div>
                </div>

                <div className="d-flex justify-content-start align-items-center product-price taka-text-lg-bold py-4 px-3 my-3">
                  $ {product.price}
                </div>
                <Row className="my-4">
                  <Col className="text-muted" sm lg={2}>
                    Description
                  </Col>
                  <Col className="taka-text-sm-normal" sm lg={10}>
                    {product.description}
                  </Col>
                </Row>
                <Row className="my-4">
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
                <div className="px-1 py-1">
                  <button
                    className="btn-add-to-cart mx-2"
                    type="button"
                    onClick={() => {
                      if (!isAlerted) {
                        handleOnClick("add_item");
                        changeAlertStatus();
                      }
                    }}
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
          </div>
          <Review reviews={reviews}/>
        </>
      )}
    </>
  );
};

export default ProductDetail;
