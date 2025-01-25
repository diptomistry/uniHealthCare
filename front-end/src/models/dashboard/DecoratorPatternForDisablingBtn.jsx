import React from 'react'

const DecoratorPatternForDisablingBtn = (WrappedComponent) => {
 return function DecoratedButton(props) {

    const { isDisabled, ...otherProps } = props;

    if (isDisabled) {
      return React.cloneElement(WrappedComponent, {
        ...otherProps,
        disabled: true,
        className: `${WrappedComponent.props.className} opacity-50 cursor-not-allowed`
      });
    }

    return WrappedComponent;
  };
}

export default DecoratorPatternForDisablingBtn