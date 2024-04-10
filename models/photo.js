const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const photoSchema = new Schema({
  title: {
    type: String,
    required: [true, "A photo must have a title"],
  },
  description: {
    type: String,
    required: [true, "A photo must have a description"],
  },
  image: {
    type: String,
    // required: [true, "A photo must have an image"],
  },
  address: {
    type: String,
    required: [true, "A photo must have an address"],
  },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  creator: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

// photoSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "creator",
//     select: "name",
//   });

//   next();
// });

module.exports = mongoose.model("Photo", photoSchema);
