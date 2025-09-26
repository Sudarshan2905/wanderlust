// const Joi = require("joi");

// module.exports.listingSchema = Joi.object({
//     listing : Joi.object({
//         title : Joi.string().required(),
//         description : Joi.string().required(),
//         price : Joi.number().min(0).required(),
//         country : Joi.string().required(),
//         location : Joi.string().required(),
//         image : Joi.string().allow("",null),
//     }).required()
// });

// module.exports.reviewSchema = Joi.object({
//     review : Joi.object({
//         rating : Joi.number().required().min(1).max(5),
//         comment : Joi.string().required(),
//     }).required()
// })

const Joi = require("joi");

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().min(0).required(),
        country: Joi.string().required(),
        location: Joi.string().required(),
        category: Joi.string()
            .valid(
                "trending",
                "rooms",
                "iconic-cities",
                "mountains",
                "castles",
                "amazing-pools",
                "camping",
                "farms",
                "arctic",
                "doms",
                "boats"
            )
            .required(), // ✅ add this line
        image: Joi.string().allow("", null)
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required()
    }).required()
});
