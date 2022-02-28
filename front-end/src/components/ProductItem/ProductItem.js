import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./ProductItem.scss";

const ProductItem = ({ product }) => { 
  const checkImgUrl =(url) => {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
  }

  return (
    <Link className="product-item-link" to={`/product/${product.id}`}>
      <Card className="product-item">
        <div className="product-item-stock">{product.countInStock} left </div>
        {checkImgUrl(product.images[0].url) ? (
          <Card.Img
            className="product-item-thumbnail"
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
          <Card.Title className="product-item-name">{product.name}</Card.Title>
          <Card.Text className="product-item-description">
            {product.description}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <div className="product-item-rating d-flex justify-content-between">
            <div>Rating: {product.rating}/5</div>
            <div className="text-muted">{product.numOfReviews} {product.numOfReviews > 1 ? "reviews" : "review"}</div>
          </div>
          <div className="product-item-price">
            {product.price}
            <span className="product-item-price-unit ms-1">$</span>
          </div>
        </Card.Footer>
      </Card>
    </Link>
  );
};

export default ProductItem;
