// withLoading.js
import React from 'react';
import FullScreenLoader from '../components/LoginSignupPage/FullScreenLoader';

function withLoading(Component) {
   
  return function WithLoadingComponent({ isLoading, ...props }) {
    console.log('WithLoadingComponent',isLoading);
    return (
      <>
        {isLoading && <FullScreenLoader />}
        <Component {...props} />
      </>
    );
  };
}

export default withLoading;
