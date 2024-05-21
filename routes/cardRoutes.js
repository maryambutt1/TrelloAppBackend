const express = require("express");
const router = express.Router();
const Card = require("../models/Card");
const List = require("../models/List");

router.post("/create", async (req, res) => {
  try {
    console.log("Request to create card:", req.body);

    const { title, listId } = req.body;
    if (!title || !listId) {
      return res.status(400).json({ message: "Title and listId are required" });
    }

    const newCard = new Card({ title, listId });
    const savedCard = await newCard.save();

    // Find the list and update its cards array
    const list = await List.findById(listId);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    list.cards.push(savedCard._id);
    await list.save();

    res.status(201).json(savedCard);
  } catch (error) {
    console.error("Error creating card:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
