import React from 'react';

import './Rating.scss';

const Rating = ({ text, color, value }) => {

    return (
        <div className="rating">
            <span>
                <i
                    style={{ color }}
                    className={
                        value >= 1
                            ? 'fas fa-star'
                            : value >= 0.5
                            ? 'fas fa-star-half-alt'
                            : 'far fa-star'
                    }     
                ></i>
            </span>
            <span>
                <i
                    style={{ color }}
                    className={
                        value >= 1
                            ? 'fas fa-star'
                            : value >= 0.5
                            ? 'fas fa-star-half-alt'
                            : 'far fa-star'
                    }     
                ></i>
            </span>
            <span>
                <i
                    style={{ color }}
                    className={
                        value >= 1
                            ? 'fas fa-star'
                            : value >= 0.5
                            ? 'fas fa-star-half-alt'
                            : 'far fa-star'
                    }     
                ></i>
            </span>
            <span>
                <i
                    style={{ color }}
                    className={
                        value >= 1
                            ? 'fas fa-star'
                            : value >= 0.5
                            ? 'fas fa-star-half-alt'
                            : 'far fa-star'
                    }     
                ></i>
            </span>
            <span>
                <i
                    style={{ color }}
                    className={
                        value >= 1
                            ? 'fas fa-star'
                            : value >= 0.5
                            ? 'fas fa-star-half-alt'
                            : 'far fa-star'
                    }     
                ></i>
            </span>
        </div>
    )
}

Rating.defaultProps = {
    color: '#f8e825',
  }

export default Rating;