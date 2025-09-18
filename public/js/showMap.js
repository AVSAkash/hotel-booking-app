// public/javascripts/showMap.js

document.addEventListener("DOMContentLoaded", () => {
  const mapDiv = document.getElementById("map");
  if (!mapDiv) return; // no map on this page

  // Read data-* attributes
  const coords = JSON.parse(mapDiv.dataset.coords);
  const title = JSON.parse(mapDiv.dataset.title);
  const location = JSON.parse(mapDiv.dataset.location);

  if (!coords || coords.length !== 2) return;

  const map = L.map("map").setView([coords[1], coords[0]], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);

  L.marker([coords[1], coords[0]])
    .addTo(map)
    .bindPopup(`<b>${title}</b><br>${location}`)
    .openPopup();
});
