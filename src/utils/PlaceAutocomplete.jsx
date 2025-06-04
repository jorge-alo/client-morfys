import { useEffect, useRef } from 'react';
import { setLoadScriptCallback } from '@googlemaps/extended-component-library';

setLoadScriptCallback((src) => {
  const script = document.createElement('script');
  script.src = src;
  document.head.appendChild(script);
  return script;
});

export const PlaceAutocomplete = ({ onPlaceSelected }) => {
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);

  useEffect(() => {
    const initAutocomplete = async () => {
      if (!inputRef.current || autocompleteRef.current) return;

      await customElements.whenDefined('gmpx-place-autocomplete');
      
      autocompleteRef.current = new google.maps.places.PlaceAutocompleteElement({
        inputElement: inputRef.current,
        componentRestrictions: { country: 'ar' }
      });

      autocompleteRef.current.addEventListener('place_changed', () => {
        const place = autocompleteRef.current.value;
        if (place && onPlaceSelected) {
          onPlaceSelected(place.formatted_address);
        }
      });
    };

    initAutocomplete();

    return () => {
      if (autocompleteRef.current) {
        autocompleteRef.current.removeEventListener('place_changed');
      }
    };
  }, []);

  return <input ref={inputRef} type="text" placeholder="Ingresa tu dirección" />;
};