const express = require("express");
const fileUpload = require('../util/fileUpload')

const photosControllers = require("../controllers/photos-controller");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", photosControllers.getAllPhotos);

router.get(`/:id`, photosControllers.getPhotoById);

router.get("/user/:uid", photosControllers.getPhotosByUserId);

router.post(
  "/",
  authController.protect,
  fileUpload.single("image"),
  photosControllers.createPhoto
);

router.patch("/:id", authController.protect, photosControllers.updatePhotoById);

router.delete(
  "/:id",
  authController.protect,
  // authController.restrictTo("admin"),
  photosControllers.deletePhoto
);

module.exports = router;
