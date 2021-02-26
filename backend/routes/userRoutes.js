const express = require("express");
const {
  login,
  register,
  getProfile,
  updateUser,
  updateUserPassword,
  uploadUserPhoto,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controllers/userControllers");
const { protect, adminOrCommite } = require("../middlewares/auth");

const router = express.Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/profile").get(protect, getProfile);
router.route("/profile").put(protect, updateUser);
router.route("/:userId/password").put(protect, updateUserPassword);
router.route("/:userId/photo").put(protect, uploadUserPhoto);
router.route("/users/admin").get(protect, adminOrCommite, getAllUsers);
router
  .route("/:userId/admin")
  .get(protect, adminOrCommite, getUserById)
  .put(protect, adminOrCommite, updateUserById)
  .delete(protect, adminOrCommite, deleteUserById);

module.exports = router;
