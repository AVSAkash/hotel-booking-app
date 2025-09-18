const Listing = require("../models/listing.js");
const NodeGeocoder = require("node-geocoder");

// Geocoder setup (OpenStreetMap provider)
const geocoder = NodeGeocoder({
  provider: "openstreetmap"
});

// Show all listings
module.exports.index = async (req, res) => {
  const alllisting = await Listing.find({});
  res.render("listings/index", { alllisting });
};

// Render New Form
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new");
};

// Show one listing
module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: { path: "author" },
    })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing You Requested does not Exist");
    return res.redirect("/listings");
  }

  res.render("listings/show", { listing });
};

// Create a new listing
module.exports.createListing = async (req, res) => {
  const listing = new Listing(req.body.listing);

  // Geocode location → store coordinates
  const geoData = await geocoder.geocode(listing.location);
  if (geoData.length) {
    listing.geometry = {
      type: "Point",
      coordinates: [geoData[0].longitude, geoData[0].latitude],
    };
  }

  // If file uploaded
  if (req.file) {
    listing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }

  listing.owner = req.user._id;
  await listing.save();

  req.flash("success", "New Listing Created!");
  res.redirect(`/listings/${listing._id}`);
};

// Render Edit Form
module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing You Requested does not Exist");
    return res.redirect("/listings");
  }

  res.render("listings/edit", { listing });
};

// Update Listing
module.exports.updateListing = async (req, res) => {
  let { id } = req.params;

  // Update fields
  const listing = await Listing.findByIdAndUpdate(
    id,
    { ...req.body.listing },
    { new: true }
  );

  // Geocode if location changed
  if (req.body.listing.location) {
    const geoData = await geocoder.geocode(req.body.listing.location);
    if (geoData.length) {
      listing.geometry = {
        type: "Point",
        coordinates: [geoData[0].longitude, geoData[0].latitude],
      };
    }
  }

  // If new file uploaded
  if (req.file) {
    listing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }

  // If new image URL provided
  if (req.body.listing.imageUrl && req.body.listing.imageUrl.trim() !== "") {
    listing.image = {
      url: req.body.listing.imageUrl,
      filename: "", // no filename since it's not from Cloudinary
    };
  }

  await listing.save();

  req.flash("success", "Listing Edited");
  res.redirect(`/listings/${listing._id}`);
};

// Delete Listing
module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted");
  res.redirect("/listings");
};
