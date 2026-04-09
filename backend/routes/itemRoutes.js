const express = require('express');
const router = express.Router();
const {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  getInventoryStats,
} = require('../controllers/itemController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', protect, getItems);
router.get('/stats', protect, getInventoryStats);
router.get('/:id', protect, getItemById);
router.post('/', protect, authorize('Admin', 'Manager'), createItem);
router.put('/:id', protect, authorize('Admin', 'Manager'), updateItem);
router.delete('/:id', protect, authorize('Admin', 'Manager'), deleteItem);

module.exports = router;
