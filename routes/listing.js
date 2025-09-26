const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer = require("multer");
const {storage} = require("../cloudconfig.js");
const upload = multer({ storage });



router.route("/")
    // Show all listings - index route
    .get( wrapAsync(listingController.index ))
    // add listing - create route
     .post( isLoggedIn, 
        upload.single('listing[image]'), 
        validateListing, 
        wrapAsync( listingController.createListing 
            )
        );



// create new listing - new route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
    // Show specific listing - show route
    .get(wrapAsync( listingController.showListing))
    // Update route 
    .put(isLoggedIn, isOwner, upload.single('listing[image]'),validateListing, wrapAsync( listingController.updateListing))
    // Delete route
    .delete(isLoggedIn, isOwner, wrapAsync( listingController.destroyListing));


// Edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync( listingController.renderEditForm));



module.exports = router;

// router.get("/", async (req, res) => {
//   try {
//     let { country } = req.query;
//     let listings;

//     if (country) {
//       listings = await Listing.find({ country: new RegExp(country, "i") }); 
//       // "i" = case insensitive search
//     } else {
//       listings = await Listing.find({});
//     }

//     res.render("listings/index", { listings });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Something went wrong");
//   }
// });