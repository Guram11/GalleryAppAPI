const express = require("express");
const multer = require("multer");
const fileUpload = require("../util/fileUpload");

const usersControllers = require("../controllers/users-controllers");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/signup", fileUpload.single("image"), authController.signup);

router.post("/login", authController.login);

router.post("/forgotPassword", authController.forgotPassword);

router.patch("/resetPassword/:token", authController.resetPassword);

// router.use(authController.protect);

router.patch("/updateMyPassword", authController.updatePassword);

router.delete("/deleteMe", usersControllers.deleteMe);

router.patch("/updateMe", usersControllers.updateMe);

router.get("/me", usersControllers.getMe, usersControllers.getUserById);

// router.use(authController.restrictTo("admin"));

router.get("/", usersControllers.getAllUsers);
router.get("/:id", usersControllers.getUserById);
router.patch("/:id", usersControllers.updateUser);
router.delete("/:id", usersControllers.deleteUser);

module.exports = router;
