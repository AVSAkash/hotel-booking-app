const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./reviews.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image:{
        filename: String,
        url:{
            type:String,
            set: (v)=> v===""?"https://www.himkhoj.com/wp-content/uploads/2020/08/d_h.png":v,
            default: "https://www.himkhoj.com/wp-content/uploads/2020/08/d_h.png",
        },
    },
    price: Number,
    location: String,
    country: String,
    geometry: {
        type: {
            type: String,
            enum: ["Point"], 
            required: false
        },
        coordinates: {
            type: [Number],
            required: false
        }
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;
