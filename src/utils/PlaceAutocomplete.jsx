import { useEffect, useRef } from "react";

export const PlaceAutocomplete = ({ onPlaceSelected }) => {
    const inputRef = useRef(null);
    const autocompleteRef = useRef(null);

    useEffect(() => {
        if (!window.google || !window.google.maps) return;

        autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
            componentRestrictions: { country: "ar" },
            fields: ["formatted_address", "geometry", "name"],
            types: ["address"], // solo direcciones
        });

        autocompleteRef.current.addListener("place_changed", () => {
            const place = autocompleteRef.current.getPlace();
            if (place && onPlaceSelected) {
                onPlaceSelected(place.formatted_address || "");
            }
        });

        // cleanup
        return () => {
            if (autocompleteRef.current) {
                window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
            }
        };
    }, [onPlaceSelected]);

    return (
        <input
            className="inputAutocomplete"
            type="text"
            ref={inputRef}
            placeholder="Ingresa tu dirección"
            style={{ width: "100%", height: "40px", padding: "8px" }}
        />
    );
};