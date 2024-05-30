const express = require("express");
const router = express.Router();
const Board = require("../models/Board");
const List = require('../models/List');
const Card = require('../models/Card');

// Get all boards
router.get('/', async (req, res) => {
  try {
    const boards = await Board.find();
    res.send(boards);
  } catch (error) {
    res.status(500).send(error);
  }
});

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

router.get('/:boardId/lists', async (req, res) => {
  try {
    const { boardId } = req.params;
    console.log(`Fetching lists for boardId: ${boardId}`);
    const lists = await List.find({ boardId: boardId });
    console.log('Fetched lists:', lists);
    res.json(lists);
  } catch (error) {
    console.error('Error fetching lists:', error.message, error.stack);
    res.status(500).send('Server Error');
  }
});

// Get all cards for a specific list
router.get('/lists/:listId/cards', async (req, res) => {
  try {
    const { listId } = req.params;
    console.log(`Fetching cards for listId: ${listId}`);
    const cards = await Card.find({ listId: listId });
    console.log('Fetched cards:', cards);
    res.json(cards);
  } catch (error) {
    console.error('Error fetching cards:', error.message, error.stack);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
