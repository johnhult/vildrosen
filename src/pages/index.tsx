import * as React from 'react';
import * as Gatsby from 'gatsby';
import Hero from 'components/Hero';

interface HomepageProps {}

export default function Homepage(props: HomepageProps) {
  const handleClick = async () => {
    try {
      const id = 'someid';
      const ya = await fetch(`/api/google-sheets?query=${id}`);
      console.log(ya);

      if (!ya.ok) {
        throw new Error(ya.statusText);
      }
      const result = await ya.json();
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Hero
        title={'Vildrosen'}
        cta={{
          label: 'Ansök nu!',
          interaction: () => '/ansokan',
        }}
      />
      <div style={{ height: '400px', backgroundColor: 'red' }}>
        <button onClick={() => handleClick()}>click me</button>
      </div>
      <div style={{ height: '400px', backgroundColor: 'lightblue' }}></div>
      <div style={{ height: '400px', backgroundColor: 'cornflowerblue' }}></div>
      <div style={{ height: '400px', backgroundColor: 'olive' }}></div>
    </>
  );
}

export const Head: Gatsby.HeadFC = () => <title>Vildrosen</title>;
