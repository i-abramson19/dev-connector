const express = require('express');
const request = require('request');
const config = require('config');
const url = require('url');
const Promise = require('bluebird');
const router = express.Router();
const async = require('async');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');

let result = [];

const githubUrl = 'https://jobs.github.com/positions.json';
const indeedUrl = 'http://api.indeed.com/ads/apisearch?format=json&publisher=9502962293046243&q=java&l=austin%2C+tx&sort=&radius=&st=&jt=&start=&limit=&1fromage=&filter=&latlong=1&co=us&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2';


// @route    GET api/jobs
// @desc     Get jobs from 
// @access   Public
router.get('/', (req, res) => {
  try {
    const options = {
      uri: githubUrl,
      method: 'GET',
      headers: { 'user-agent': 'node.js' }
    };

    request(options, (error, response, body) => {
      if(error) console.error(error);

      if(response.statusCode !== 200) {
        return res.status(404).json({ msg: 'Error fetching jobs' });
      }

      res.json(JSON.parse(body));
    });

  } catch (err) {
    console.error(err.messsage);
    res.status(500).send('Server error');
  }
});

// @route    GET api/jobs
// @desc     Get jobs from 
// @access   Public
router.get('/search', (req, res) => {

  let location = req.query.location;

  let description = req.query.description;

  let newUrl = githubUrl

  if (description === '') {
    newUrl = newUrl + '?location=' + encodeURIComponent(location);
  } else {
    newUrl = newUrl + '?location=' + encodeURIComponent(location) +
      '&description=' + encodeURIComponent(description);
  }

  try {
    const options = {
      uri: newUrl,
      method: 'GET',
      headers: { 'user-agent': 'node.js' }
    };

    request(options, (error, response, body) => {
      if(error) console.error(error);

      if(response.statusCode !== 200) {
        return res.status(404).json({ msg: 'Error fetching jobs' });
      }

      res.json(JSON.parse(body));
    });

  } catch (err) {
    console.error(err.messsage);
    res.status(500).send('Server error');
  }
});

module.exports = router;
