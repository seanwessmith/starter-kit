import React, { Fragment } from 'react';
import Favicon from 'react-favicon';
import StarterRouter from './routes/index';
import icon from './images/favicon.png';
import './index.scss';

const App = () => (
  <Fragment>
    <Favicon url={icon} />
    <StarterRouter />
  </Fragment>
);

export default App;
