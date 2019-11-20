import React, { useState } from 'react';
import {
  Switch,
  Route,
  Router,
} from 'react-router-dom';
import LandingPage from '../containers/landing-page';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const StarterRouter = () => {
  const [loading, setLoading] = useState(false);

  const defaultProps = {
    loading,
  };

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" render={() => <LandingPage {...defaultProps} />} />
      </Switch>
    </Router>
  );
};

export default StarterRouter;
