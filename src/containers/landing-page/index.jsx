import React, { useRef } from 'react';
import FlipMove from './flipMove';

const LandingPage = (props) => {
  const elRef1 = useRef(null);
  const elRef2 = useRef(null);
  const elRef3 = useRef(null);
  const list = [
    <div className='li' ref={elRef1} key='item-1'>item 1</div>,
    <div className='li' ref={elRef2} key='item-2'>item 2</div>,
    <div className='li' ref={elRef3} key='item-3'>item 3</div>,
  ];

  return (
    <div className='landing-page-container'>
      <div className='ul'>
        <FlipMove>{list}</FlipMove>
      </div>
    </div>
  )
}

export default LandingPage;
