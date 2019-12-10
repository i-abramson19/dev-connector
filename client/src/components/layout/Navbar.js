import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { getMessages } from '../../actions/message';

const Navbar = ({
  logout,
  getMessages,
  auth: { isAuthenticated, user },
  message: { messages, loading } 
}) => {
    useEffect(() => {
      if (user) {
        getMessages(user._id)
      } else {
        getMessages()
      };
    }, [getMessages]);
    const authLinks = (
      <ul>
        <li>
          <Link to='/profiles'>Developers</Link>
        </li>
        <li>
          <Link to='/jobs'>Jobs</Link>
        </li>
        <li>
          <Link to='/posts'>Posts</Link>
        </li>
        <li>
          <Link to='/messages'>Messages {' '}{messages.length > 0 && (
                              <span className='messages-count'>{messages.length}</span>
                          )}</Link>
        </li>
        <li>
          <Link to='/dashboard'>
            <i className='fas fa-user' />{' '}
            <span className='hide-sm'>Dashboard</span>
          </Link>
        </li>
        <li>
          <a onClick={logout} href='#!'>
            <i className='fas fa-sign-out-alt' />{' '}
            <span className='hide-sm'>Logout</span>
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul>
        <li>
          <Link to='/profiles'>Developers</Link>
        </li>
        <li>
          <Link to='/jobs'>Jobs</Link>
        </li>
        <li>
          <Link to='/register'>Register</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
      </ul>
    );

    return (
      <nav className='navbar bg-dark'>
        <h1>
          <Link to='/'>
            <i className='fas fa-code' /> DevBo
          </Link>
        </h1>
        {!loading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}
      </nav>
    );
};

Navbar.propTypes = {
  getMessages: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  message: state.message,
});

export default connect(
  mapStateToProps,
  { logout, getMessages }
)(Navbar);
