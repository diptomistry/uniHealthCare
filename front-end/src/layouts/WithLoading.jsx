import React from 'react';

function withLoading(Component, { loader: Loader = null }) {
  // Default loader using Tailwind spinner if no custom loader is passed
  const DefaultLoader = () => (
    <div className="flex justify-center items-center w-full h-full">
      <div className="border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
    </div>
  );

  return function WithLoadingComponent({ isLoading, loader, ...props }) {
    const LoaderComponent = Loader||DefaultLoader; // Use passed loader or default spinner
    return (
      <>
        {isLoading && <LoaderComponent />}
        <Component {...props} />
      </>
    );
  };
}

export default withLoading;
