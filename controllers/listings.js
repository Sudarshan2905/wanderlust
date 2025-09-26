const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });


module.exports.index = async (req, res) => {
    const { search, category } = req.query; // search = country/location, category = icon click
    let allListings;

    const query = {};

    // Add search filter for country or location
    if (search && search.trim() !== "") {
        query.$or = [
            { country: new RegExp(search, "i") },
            { location: new RegExp(search, "i") }
        ];
    }

    // Add category filter
    if (category && category !== "null") {
        query.category = category;
    }

    // Fetch listings based on combined query
    allListings = await Listing.find(query);
    
    res.render("listings/index.ejs", { allListings });
};

// create new listing - new route
module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new.ejs");
};

// add listing - create route
module.exports.createListing = async(req,res,next)=>{
    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
        })
        .send();

    // console.log("resposnce: ",resposnce.body.features[0].geometry);
    // res.send("Done");
    

    let url = req.file.path;
    let filename = req.file.filename;
    
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};
    newListing.geometry = response.body.features[0].geometry;
    let savedListing = await newListing.save();
    console.log(savedListing);
    
    req.flash("success","New listing created!");
    res.redirect("/listings");
};

// Show specific listing - show route
module.exports.showListing = async (req,res)=>{
    let {id}=req.params;
    const listing = await Listing.findById(id)
        .populate({path : "reviews", 
            populate : { path : "author"
                }
            })
        .populate("owner");
    if(!listing){
        req.flash("error","Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    console.log(listing.owner);
    
    res.render("listings/show.ejs",{listing, reviews : listing.reviews});
}

// Edit route
module.exports.renderEditForm = async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl= originalImageUrl.replace("/upload","/upload/h_200,w_250");
    res.render("listings/edit.ejs",{listing, originalImageUrl});
}

// Update route

module.exports.updateListing = async(req,res)=>{
    let {id}=req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});

    // if location is changed, re-run geocoding
    if(req.body.listing.location){
        let response = await geocodingClient.forwardGeocode({
            query: req.body.listing.location,
            limit: 1
        }).send();
        listing.geometry = response.body.features[0].geometry;
        await listing.save();
    }

    if(typeof req.file != "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url,filename};
        await listing.save();
    }
    
    req.flash("success","Listing updated successfully!");
    res.redirect(`/listings/${id}`);
}


// Delete route
module.exports.destroyListing = async(req,res)=>{
    let {id}=req.params;
    let delListing = await Listing.findByIdAndDelete(id);
    console.log(delListing);
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
}













// Show all listings - index route
// module.exports.index = async (req,res)=>{
//     const allListings = await Listing.find();
//     res.render("listings/index.ejs",{allListings});
// };

// module.exports.index = async (req, res) => {
//   const { country } = req.query;
//   let allListings;
//   let messages = { success: [], error: [] };

//   if (country && country.trim() !== "") {
//     allListings = await Listing.find({ country: new RegExp(country, "i") }); // case-insensitive search

//     if (allListings.length === 0) {
//       messages.error.push(`No listings found for "${country}"`);
//     } else {
//       messages.success.push(`${allListings.length} listing(s) found for "${country}"`);
//     }
//   } else {
//     allListings = await Listing.find({});
//     if (allListings.length === 0) {
//       messages.error.push("No listings available.");
//     }
//   }

//   // Render the page directly — NO redirect
//   res.render("listings/index.ejs", { allListings, ...messages });
// };


// module.exports.index = async (req, res) => {
//   const { search } = req.query; // we can use a single search input for country or location
//   let allListings;
//   let messages = { success: [], error: [] };

//   if (search && search.trim() !== "") {
//     // Search country OR location, case-insensitive
//     allListings = await Listing.find({
//       $or: [
//         { country: new RegExp(search, "i") },
//         { location: new RegExp(search, "i") }
//       ]
//     });

//     if (allListings.length === 0) {
//       messages.error.push(`No listings found for "${search}"`);
//     } else {
//       messages.success.push(`${allListings.length} listing(s) found for "${search}"`);
//     }
//   } else {
//     allListings = await Listing.find({});
//     if (allListings.length === 0) {
//       messages.error.push("No listings available.");
//     }
//   }

//   res.render("listings/index.ejs", { allListings, ...messages });
// };

// update route
// module.exports.updateListing = async(req,res)=>{
//     let {id}=req.params;
//     let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
//     if(typeof req.file != "undefined"){
//         let url = req.file.path;
//         let filename = req.file.filename;
//         listing.image = {url,filename};
//         await listing.save();
//     }
    

//     req.flash("success","Listing updated successfully.!");
//     res.redirect(`/listings/${id}`);
// }