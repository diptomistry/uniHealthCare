import React, { useState, useEffect } from 'react';
import SigninSignup from './SigninSignup';

const SigninSignupRoot = () => {
    const [isLoading, setIsLoading] = useState(false);
    console.log('SigninSignupRoot',isLoading);

 
  
    return <SigninSignup isLoading={isLoading} setIsLoading={setIsLoading} />;
  }
export default SigninSignupRoot