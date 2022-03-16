import { Alert } from 'react-bootstrap';

const Message = ({variant, children}) => {
    return (
        <Alert className="message" variant={variant}>{children}</Alert>
    )
}

Message.defaultProps = {
    variant: 'info'
}

export default Message;
