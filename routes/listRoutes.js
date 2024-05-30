const express = require("express");
const router = express.Router();
const List = require("../models/List");
const Board = require("../models/Board");

router.post("/create", async (req, res) => {
  console.log("Request to create list", req.body)
  const { title, boardId } = req.body;
  try {
    const newList = new List({ title, boardId });
    const savedList = await newList.save();

    // Update the corresponding board
    const board = await Board.findById(boardId);
    board.lists.push(savedList._id);
    await board.save();

    res.status(201).json(savedList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
