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
router.put("/moveCard", async (req, res) => {
  const { cardId, sourceListId, destinationListId } = req.body;

  try {
    // Update the card's listId
    const card = await Card.findById(cardId);
    card.listId = destinationListId;
    await card.save();
    console.log("card", card);
    // Update the source list's cards array
    const sourceList = await List.findById(sourceListId);
    sourceList.cards = sourceList.cards.filter(
      (id) => id.toString() !== cardId
    );
    await sourceList.save();
    console.log("sourcelist", sourceList);
    // Update the destination list's cards array
    const destinationList = await List.findById(destinationListId);
    destinationList.cards.push(cardId);
    await destinationList.save();
    console.log("destinationList", destinationList);
    res.status(200).send({ message: "Card moved successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error moving card", error });
  }
});

module.exports = router;
