import React, { useEffect, useRef, useState } from 'react';

const AddressAutocomplete = ({ onAddressSelect }) => {
  const inputRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const checkGoogleMapsLoaded = () => {
      if (window.google && window.google.maps && window.google.maps.places) {
        setIsLoaded(true);
      } else {
        setTimeout(checkGoogleMapsLoaded, 100);
      }
    };

    checkGoogleMapsLoaded();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ['address'],
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place.formatted_address) {
        onAddressSelect(place.formatted_address);
      }
    });

    return () => {
      if (window.google && window.google.maps && window.google.maps.event) {
        window.google.maps.event.clearInstanceListeners(autocomplete);
      }
    };
  }, [isLoaded, onAddressSelect]);

  return (
    <input
    className='py-3 px-2 bg-[#d5f2ec] rounded-lg'
      ref={inputRef}
      type="text"
      placeholder=" Search and Set your address"
    />
  );
};

export default AddressAutocomplete;