import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const JobItem = ({ 
    auth, 
    job: {type, url, created_at, company, company_url, location,
        title, description, how_to_apply, company_logo },
    showActions
}) => (
    <div className="job bg-white p-1 my-1">
        <div className="row">
            <div className="col-6">
                <img
                    className="round-img"
                    src={company_logo}
                    alt={company}
                />
                <h4>{company}</h4>
                <h4>{title}</h4>
                <h5>{location}</h5>
            </div>
            <div className="col-6">
            </div>
        </div>
        <div className="content">
            <p className="my-1">
                {description}
            </p>
            <p className="my-1"
                dangerouslySetInnerHTML={ {__html: how_to_apply} }>
            </p>
        </div>
    </div>
);

JobItem.defaultProps = {
    showActions: true
};

JobItem.propTypes = {
    job: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { })(JobItem);
