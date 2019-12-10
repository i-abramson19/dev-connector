import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import JobItem from './JobItem';
import { getJobs } from '../../actions/job';
import JobSearch from './JobSearch';


const Jobs = ({
    getJobs,
    job: { jobs, loading }
}) => {
    useEffect(() => {
        getJobs();
    }, [getJobs]);

    return loading ? <Spinner /> : (
        <Fragment>
            <h1 className="large text-primary">Jobs</h1>
            <JobSearch />

            <p className="lead">
            </p>

            <div className="">
                {
                    jobs.map(job => (
                        <JobItem key={job._id} job={job} />
                    ))
                }
            </div>
            <span id="indeed_at"><a title="Job Search" href="https://www.indeed.com" rel="nofollow" >jobs by <img alt="Indeed" src="https://www.indeed.com/p/jobsearch.gif" /></a></span>
        </Fragment>
    );
};

Jobs.propTypes = {
    getJobs: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    job: state.job,
    auth: state.auth
});

export default connect(mapStateToProps, { getJobs })(Jobs);
