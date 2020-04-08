import { useEffect } from 'react';

const yDiff = 62;

const FlipMove = ({ children }) => {
  useEffect(() => {
    console.log('useEffect start');
    const el1 = children[0].ref.current;
    const el2 = children[1].ref.current;
    const el3 = children[2].ref.current;
    if (el1) {
      // Get the first position.
      const first = el1.getBoundingClientRect();

      // Move it to the end.
      el1.classList.add('translator-3');
      const val = children.shift();
      children.push(val);

      // // Get the last position.
      const last = el1.getBoundingClientRect();

      // // Invert.
      const invert = first.top - last.top;

      // Go from the inverted position to last.
      el1.animate([
        { transform: `translateY(${invert}px)` },
        { transform: 'translateY(0)' },
      ], {
        duration: 700,
        easing: 'cubic-bezier(0,0,0.32,1)',
      });
      el2.animate([
        { transform: `translateY(${yDiff}px)` },
        { transform: 'translateY(0)' },
      ], {
        duration: 700,
        easing: 'cubic-bezier(0,0,0.32,1)',
      });
      el3.animate([
        { transform: `translateY(${yDiff}px)` },
        { transform: 'translateY(0)' },
      ], {
        duration: 700,
        easing: 'cubic-bezier(0,0,0.32,1)',
      });
    }
  });

  console.log('children: ', children);

  return children;
}

export default FlipMove;
