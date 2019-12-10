import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import job from './job';
import message from './message';
import profile from './profile';
import post from './post';

export default combineReducers({
  alert,
  auth,
  job,
  message,
  profile,
  post
});
