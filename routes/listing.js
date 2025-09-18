const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});


// All Listings
router
  .route("/")
  .get(wrapAsync(listingController.index)) // Index
  .post(isLoggedIn,upload.single("image"), validateListing, wrapAsync(listingController.createListing)); // Create

// New Listing Form
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Single Listing
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing)) // Show
  .put(isLoggedIn, isOwner,upload.single("image"), validateListing, wrapAsync(listingController.updateListing)) // Update
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing)); // Delete

// Edit Form
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;
