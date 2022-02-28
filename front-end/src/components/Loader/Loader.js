import { Container } from 'react-bootstrap';

import './Loader.scss';

const Loader = () => {

    return (
        <div className="loader">
            <h1 className="loader-title">We are getting data for you...</h1>
            <p className="loader-text">This might take a few seconds!</p>
        </div>
    )
}

export default Loader;