import React from 'react';
import Page from './src/components/Page';

// Wraps every page in a component
const wrapPageElement = ({ element, props }) => {
  return <Page {...props}>{element}</Page>;
};

export default wrapPageElement;
