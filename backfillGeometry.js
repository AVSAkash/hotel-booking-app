// backfillGeometry.js
const mongoose = require("mongoose");
const Listing = require("./models/listing"); // adjust path if needed
const NodeGeocoder = require("node-geocoder");

mongoose.connect("mongodb://127.0.0.1:27017/avs_hotels")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("MongoDB connection error:", err));

const geocoder = NodeGeocoder({ provider: "openstreetmap" }); // or your provider

async function backfillGeometry() {
  // Find all listings that either have no geometry or empty coordinates
  const listings = await Listing.find({
    $or: [
      { geometry: { $exists: false } },
      { geometry: null },
      { "geometry.coordinates": { $exists: false } },
      { "geometry.coordinates": { $size: 0 } },
      { "geometry.coordinates": null }
    ]
  });

  console.log(`Found ${listings.length} listings to backfill`);

  for (let listing of listings) {
    if (!listing.location) {
      console.log(`Skipping "${listing.title}" — no location provided`);
      continue;
    }

    try {
      const res = await geocoder.geocode(listing.location);
      if (res.length > 0) {
        listing.geometry = {
          type: "Point",
          coordinates: [res[0].longitude, res[0].latitude]
        };
        await listing.save();
        console.log(`✅ Updated geometry for: "${listing.title}"`);
      } else {
        console.log(`⚠️ Could not geocode "${listing.title}"`);
      }
    } catch (err) {
      console.log(`Error geocoding "${listing.title}":`, err);
    }
  }

  console.log("Backfill complete ✅");
  mongoose.connection.close();
}

backfillGeometry();
