import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import MessageForm from './MessageForm';
import MessageItem from './MessageItem';
import { getMessages } from '../../actions/message';

const Messages = ({
    getMessages,
    auth: { user },
    message: { messages, loading }
}) => {
    useEffect(() => {
        getMessages(user._id);
    }, [getMessages]);

    return loading ? <Spinner /> : (
        <Fragment>
            <h1 className="large text-primary">Messages</h1>
            <p className="lead">
                <i className="fas fa-user" /> 
            </p>
            <MessageForm />

            <div className="posts">
                {
                    messages.map(message => (
                        <MessageItem key={message._id} message={message} />
                    ))
                }
            </div>
        </Fragment>
    );
};

Messages.propTypes = {
    getMessages: PropTypes.func.isRequired,
    message: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    message: state.message,
    auth: state.auth
});

export default connect(mapStateToProps, { getMessages })(Messages);