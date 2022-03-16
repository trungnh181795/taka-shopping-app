import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { checkImgUrl } from "../../utilities/checkImgUrl";

import Rating from "../Rating";

import "./ProductItem.scss";

const ProductItem = ({ product }) => {

  return (
    <Link className="product-item-link" to={`/product/${product.id}`}>
      <Card className="product-item">
        <div className="product-item-stock taka-text-sm-bold">{product.countInStock} left </div>
        {checkImgUrl(product.images[0].url) ? (
          <Card.Img
            variant="top"
            src={product.images[0].url}
            alt={
              <div>No image to show</div>
            }
          />
        ) : (
          <div style={{width: '100%', paddingTop: '100%'}}></div>
        )}
        <Card.Body>
          <Card.Title className="product-item-limit-line">{product.name}</Card.Title>
          <Card.Text className="product-item-limit-line">
            {product.description}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <div className="taka-text-sm-normal d-flex justify-content-between">
            <Rating value={product.rating} />
            <div className="text-muted">{product.numOfReviews} {product.numOfReviews > 1 ? "reviews" : "review"}</div>
          </div>
          <div className="taka-text-md-bold">
            {product.price}
            <span className="ms-1">$</span>
          </div>
        </Card.Footer>
      </Card>
    </Link>
  );
};

export default ProductItem;
