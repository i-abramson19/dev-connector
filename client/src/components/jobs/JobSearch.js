import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { searchJob } from '../../actions/job';
import history from '../../config/history';

const JobSearch = ({ 
  searchJob
}) => {
  const [formData, setFormData] = useState({
    description: '',
    location: 'San Francisco, CA'
  });

  const { description, location } = formData;

  const onSearchChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    history.push(`${window.location.pathname}/search?description=${description}&location=${location}`);
    searchJob(description, location);
    e.preventDefault();
  };

  return (
    <Fragment>
        <form className='searchForm' onSubmit={e => handleSubmit(e)}>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Search by job description'
              name='description'
              onChange={e => onSearchChange(e)}
            />
            <input
              type='text'
              placeholder='Search by location'
              name='location'
              onChange={e => onSearchChange(e)}
            />
            <button
              type='submit'
            >
              Find Jobs
            </button>
          </div>
        </form>
    </Fragment>
  );
};

JobSearch.propTypes = {
  searchJob: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  job: state.job
});

export default connect(
  mapStateToProps,
  { searchJob }
)(JobSearch);
