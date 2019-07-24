import React, { useEffect, useState } from 'react';
import {
  Switch,
  Route,
  Router,
} from 'react-router-dom';
import LandingPage from '../containers/landing-page';
import InfoPage from '../containers/info-page';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const StarterRouter = () => {
  const [loading, setLoading] = useState(false);
  const [people, setPeople] = useState(false);
  const [items, setItems] = useState(false);


  useEffect(() => {
    if (!people || !items) {
      setPeople([
        { name: 'Duke Leto Atreides', position: 'Duke' },
        { name: 'Bene Gesserit', position: 'Religious Manipulation' },
      ]);
      setItems([
        { name: 'Sandworm', description: 'Only known source in the Universe of the spice melange.' },
        { name: 'Spice', description: 'The most essential and valuable commodity in the universe is melange, a drug that gives the user a longer life span, greater vitality, and heightened awareness.' },
      ]);
    }
  });

  const defaultProps = {
    loading,
    people,
    items,
  };

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" render={() => <LandingPage {...defaultProps} />} />
        <Route exact path="/info-page" render={() => <InfoPage {...defaultProps} />} />
      </Switch>
    </Router>
  );
};

export default StarterRouter;
