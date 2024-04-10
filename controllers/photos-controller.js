const getCoordsForAddress = require("../util/location");
const Photo = require("../models/photo");
const catchAsync = require("../util/catchAsync");
const AppError = require("../util/appError");
const factory = require("./handlerFactory");
const fs = require("fs");

exports.getAllPhotos = factory.getAll(Photo, {
  path: "creator",
  select: "name",
});

exports.getPhotoById = factory.getOne(Photo, {
  path: "creator",
  select: "name",
});

exports.updatePhotoById = factory.updateOne(Photo);

exports.deletePhoto = catchAsync(async (req, res, next) => {
  const document = await Photo.findByIdAndDelete(req.params.id);

  if (!document) {
    return next(new AppError("No document found with that ID", 404));
  }

  const imagePath = document.image;

  fs.unlink(imagePath, (err) => {
    console.log(err);
  });

  res.status(204).json({
    status: "success",
    data: "Document deleted!",
  });
});

exports.getPhotosByUserId = catchAsync(async (req, res, next) => {
  const photo = await Photo.find({ creator: req.params.uid }).populate({
    path: "creator",
    select: "name",
  });

  if (photo.length === 0 || !photo) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.json({
    status: "success",
    data: {
      photo,
    },
  });
});

exports.createPhoto = catchAsync(async (req, res, next) => {
  const coordinates = await getCoordsForAddress(req.body.address);

  const createdPhoto = new Photo({
    ...req.body,
    coordinates,
    image: req.file.path,
    creator: req.user.id,
  });

  const newPhoto = await Photo.create(createdPhoto);

  res.status(201).json({
    status: "success",
    data: {
      photo: newPhoto,
    },
  });
});
