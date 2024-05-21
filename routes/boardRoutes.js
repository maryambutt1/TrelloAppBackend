const express = require("express");
const router = express.Router();
const Board = require("../models/Board");

router.post("/create", async (req, res) => {
  try {
    const newBoard = new Board({
      name: req.body.name,
      bgcolor: req.body.bgcolor,
    });
    const savedBoard = await newBoard.save();
    res.status(201).json(savedBoard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
