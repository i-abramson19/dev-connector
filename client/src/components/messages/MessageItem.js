import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const MessageItem = ({ 
    auth, 
    message: { _id, text, fromName, avatar, user, date },
    showActions
}) => (
    <div className="post bg-white p-1 my-1">
        <div>
            <Link to={`/profile/${user}`}>
                <img
                    className="round-img"
                    src={avatar}
                    alt=""
                />
                <h4>{fromName}</h4>
            </Link>
        </div>
        <div>
            <p className="my-1">
                {text}
            </p>
            <p className="post-date">
                Sent on <Moment format='MM/DD/YYYY'>{date}</Moment> from {fromName}
            </p>
            {
                showActions && <Fragment>
                </Fragment>
            }
        </div>
    </div>
);

MessageItem.defaultProps = {
    showActions: true
};

MessageItem.propTypes = {
    message: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { })(MessageItem);
