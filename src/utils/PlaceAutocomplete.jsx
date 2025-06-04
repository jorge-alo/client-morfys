import { useEffect, useRef } from 'react';

export const PlaceAutocomplete = ({ onPlaceSelected }) => {
  const ref = useRef(null);

  useEffect(() => {
    const handlePlaceChange = (event) => {
      const place = event.detail;
      if (place && onPlaceSelected) {
        onPlaceSelected(place.formattedAddress || '');
      }
    };

    const element = ref.current;
    if (element) {
      element.addEventListener('gmpx-placechange', handlePlaceChange);
    }

    return () => {
      if (element) {
        element.removeEventListener('gmpx-placechange', handlePlaceChange);
      }
    };
  }, [onPlaceSelected]);

  return (
    <gmpx-place-autocomplete
      ref={ref}
      style={{ width: '100%', height: '40px' }}
      input-placeholder="Ingresa tu dirección"
      country="AR"
    ></gmpx-place-autocomplete>
  );
};