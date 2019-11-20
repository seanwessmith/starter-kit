import React from 'react';
import FanEnergy from '../../components/fanEnergy';

const LandingPage = (props) => {
  return (
    <div className='landing-page-container'>
      <h2>AHUS</h2>
      <div className="ahus-container">
        <FanEnergy />
      </div>
    </div>
  )
}

export default LandingPage;
