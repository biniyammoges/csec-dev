const express = require("express");
const { protect, adminOrCommite } = require("../middlewares/auth");
const {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

const router = express.Router();

router.route("/").post(protect, adminOrCommite, createEvent).get(getEvents);
router
  .route("/:id")
  .get(getEvent)
  .put(protect, adminOrCommite, updateEvent)
  .delete(protect, adminOrCommite, deleteEvent);

module.exports = router;
