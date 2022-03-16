import { Image, Row, Col, Container } from "react-bootstrap";

import { checkImgUrl } from "../../utilities/checkImgUrl";
import userIcon from "../../assets/profile-icon.png";
import Rating from '../Rating';

import './ReviewItem.scss';

const ReviewItem = ({ review }) => {
    const { content, rating, createdAt, userReview } = review;

    const createdDate = new Date(createdAt);
    const createdDay = `${createdDate.getDay()}/${createdDate.getMonth()}/${createdDate.getFullYear()}`;
    const createdTime = `${createdDate.getHours()}:${createdDate.getMinutes()}`;

    return (
        <li className="review-item d-flex my-3 mx-3">
            <Container>
                <Row>
                    <Col md lg={1} className="d-flex justify-content-end">
                        <Image 
                            className="review-item-avatar"               
                            src={checkImgUrl(userReview.avatar) ? userReview.avatar : userIcon}
                            roundedCircle   
                        />
                    </Col>
                    <Col md lg={11} className="d-flex flex-column align-items-start">
                        <div className="taka-text-sm-bold">{userReview.username}</div>
                        <Rating value={rating} />
                        <div className="taka-text-xs-normal text-muted">{`${createdDay} | ${createdTime}`}</div>
                        <div className="taka-text-sm-normal my-3">{content}</div>
                    </Col>
                </Row>
            </Container>
        </li>
    )
}

export default ReviewItem;