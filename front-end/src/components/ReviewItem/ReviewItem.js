import './ReviewItem.scss';

const ReviewItem = ({ review }) => {

    return (
        <li className="review-item d-flex">
            <img 
                className="review-item-avatar"
                src=""
                alt="avatar"
            />
            <div className="review-item-comment"></div>
        </li>
    )
}

export default ReviewItem;