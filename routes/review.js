const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const {listingSchema , reviewSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js");
const {isLoggedIn, isReviewAuthor,validateReview } = require("../middleware.js");
const reviewsController = require("../controllers/reviews.js");

//Review 
//post route
router.post("/", isLoggedIn,validateReview, wrapAsync(reviewsController.postReview));

//delete route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewsController.deleteReview));

module.exports=router;