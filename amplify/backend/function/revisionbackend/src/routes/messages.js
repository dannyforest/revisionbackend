const express = require("express");
const router = express.Router();

const message_controller = require("../controllers/messageController");

// POST request for creating Message.
router.post("/", message_controller.message_create);

// DELETE request to delete Message.
router.delete("/:id", message_controller.message_delete);

// PUT request to update Message.
router.put("/:id", message_controller.message_update);

// GET request for one Message.
router.get("/:id", message_controller.message_detail);

// GET request for list of all Message items.
router.get("/", message_controller.message_list);

module.exports = router;