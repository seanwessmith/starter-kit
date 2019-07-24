import React from 'react';
import { withRouter } from 'react-router-dom';
import './style.scss';

const InfoPage = (props) => {
  console.log('LandingPage props: ', props);

  const people = () => {
    if (!props.people) {
      return null;
    }
    return (
      props.people.map((p) => (
        <p key={p.name}>{p.name} is working the position {p.position}</p>
      ))
    );
  }

  function handleClick() {
    props.history.push('/info-page');
  }

  return (
    <div className='landing-page-container'>
      <h1>This is the Landing Page</h1>
      {people()}
      <button onClick={handleClick}>Go to Info Page</button>
    </div>
  )
}

export default withRouter(InfoPage);
