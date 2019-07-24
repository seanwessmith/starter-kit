import React from 'react';
import { withRouter } from 'react-router-dom';
import './style.scss';

const InfoPage = (props) => {
  console.log('InfoPage props: ', props);

  const items = () => {
    if (!props.items) {
      return null;
    }
    return (
      props.items.map((i) => (
        <p key={i.name}>{i.name}: {i.description}</p>
      ))
    );
  }

  function handleClick() {
    props.history.push('/');
  }

  return (
    <div className='info-page-container'>
      <h1>This is the Info Page</h1>
      {items()}
      <button onClick={handleClick}>Go to Landing Page</button>
    </div>
  )
}

export default withRouter(InfoPage);
