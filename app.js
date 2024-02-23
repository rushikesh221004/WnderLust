let express = require("express")
let app = express()
let port = 8080
let mongoose = require("mongoose")
let path = require("path")
let Listing = require("./models/listing")
let methodOverride = require("method-override")
let ejsMate = require("ejs-mate")

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.engine("ejs", ejsMate)

app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

main()
.then(res => console.log("connected to DB"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

app.get("/", function(req, res) {
  res.render("listings/home")
})

app.get("/listings", async function(req, res) {
   let allListings = await Listing.find()
   res.render("listings/index", {allListings})
})

app.get("/listings/new", function(req, res) {
  res.render("listings/new")
})

app.get("/listings/:id", async function(req, res) {
    let {id} = req.params
    let listing = await Listing.findById(id)
    res.render("listings/show", {listing})
})

app.post("/listings", async function(req, res) {
   let {title: title, description: description, image: image, price: price, location: location, country: country} = req.body
   let listing = await Listing.create({
    title: title,
    description: description, 
    image: image, price: price, 
    location: location, 
    country: country
   })
   listing.save()
   res.redirect("/listings")
})

app.get("/listings/:id/edit", async function(req, res) {
  let {id} = req.params
  let listing = await Listing.findById(id)
  res.render("listings/edit", {listing})
})

app.patch("/listings/:id", async function(req, res) {
  let {id} = req.params
  let {title: title, description: description, image: image, price: price, location: location, country: country} = req.body
  let listing = await Listing.findByIdAndUpdate(id, {
    title: title,
    description: description, 
    image: image, 
    price: price,
    location: location, 
    country: country
  })
  res.redirect(`/listings/${id}`)
})

app.delete("/listings/:id", async function(req, res) {
  let {id} = req.params
  await Listing.findByIdAndDelete(id)
  res.redirect("/listings")
})

app.listen(port, function() {
    console.log(`listening on port ${port}`)
})