let mongoose = require("mongoose")

let listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        type: String,
        default: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600",
        set: (v) => v === "" ? "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600" : v
    },
    price: Number,
    location: String,
    country: String
})

let Listing = mongoose.model("Listing", listingSchema)

module.exports = Listing