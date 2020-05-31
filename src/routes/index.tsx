import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import Dashboard from '../pages/Dashboard';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import Profile from '../pages/Profile';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/profile" component={Profile} isPrivate />
  </Switch>
);

export default Routes;
