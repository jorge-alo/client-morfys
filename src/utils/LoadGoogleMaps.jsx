// utils/loadGoogleMapsApi.js
export function loadGoogleMapsApi() {
  const existingScript = document.querySelector("#google-maps");
  if (existingScript) return;

  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places&language=es&region=AR`;
  script.async = true;
  script.defer = true;
  script.id = "google-maps";

  document.head.appendChild(script);
}