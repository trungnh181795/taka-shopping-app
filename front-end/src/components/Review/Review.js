import { useState, useEffect } from 'react';

import ReviewItem from '../ReviewItem';
import Message from '../Message';

import './Review.scss'

const Review = ({ reviews }) => {
    console.log(reviews)
    const [productReviews, setProductReviews] = useState(reviews ? reviews : {});

    useEffect(() => {
        setProductReviews(reviews)
    }, [reviews])

    console.log('review', productReviews)

    return (
        <div className="taka-white-frame px-3 py-3 my-3">
            <div className="taka-text-md-bold mb-3">Reviews</div>
            <ul className="product-reviews-list">
              {productReviews && productReviews.result ? (
                productReviews.result.map((review, index) => (
                  <ReviewItem key={index} review={review} />
                ))
              ) : (
                <Message variant="warning">There is no review yet!</Message>
              )}
            </ul>
          </div>
    )
}

export default Review;
