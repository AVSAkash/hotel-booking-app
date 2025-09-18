const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/avs_hotels";

main().then(()=>{
    console.log("connect to DB");
}).catch(err=>{
    console.log(err);
})

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB = async () =>{
    await Listing.deleteMany({});
    const dataWithOwner = initdata.data.map((obj) => ({
        ...obj,
        owner: "68b56fc7c9bdf465d77ff753"
    }));

    await Listing.insertMany(dataWithOwner);
    console.log("data was initialised");
}

initDB();