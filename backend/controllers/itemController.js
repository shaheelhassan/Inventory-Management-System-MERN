const asyncHandler = require('express-async-handler');
const Item = require('../models/Item');

// @desc    Get all items
// @route   GET /api/items
// @access  Private
const getItems = asyncHandler(async (req, res) => {
  const { category, status, search, sortBy } = req.query;
  let query = {};

  if (category && category !== 'All') {
    query.category = category;
  }

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { sku: { $regex: search, $options: 'i' } },
    ];
  }

  // Stock status logic (simplified as we don't have separate field)
  // In a real app, 'Low Stock' would be quantity < minQty
  // For now we use some arbitrary check or just query based on quantity
  if (status === 'Low Stock') {
    query.quantity = { $lt: 20 };
  } else if (status === 'Expired') {
    query.expiryDate = { $lt: new Date() };
  } else if (status === 'In Stock') {
    query.quantity = { $gte: 20 };
  }

  let sortOptions = {};
  if (sortBy) {
    const [field, order] = sortBy.split(':');
    sortOptions[field] = order === 'desc' ? -1 : 1;
  } else {
    sortOptions.createdAt = -1;
  }

  const items = await Item.find(query).sort(sortOptions);
  res.json(items);
});

// @desc    Get inventory stats
// @route   GET /api/items/stats
// @access  Private
const getInventoryStats = asyncHandler(async (req, res) => {
  const totalItems = await Item.countDocuments();
  const lowStockItems = await Item.countDocuments({ quantity: { $lt: 20 } });
  const expiredItems = await Item.countDocuments({ expiryDate: { $lt: new Date() } });

  const valuationResult = await Item.aggregate([
    { $group: { _id: null, totalValue: { $sum: { $multiply: ['$quantity', '$price'] } } } },
  ]);

  const categoryStock = await Item.aggregate([
    { $group: { _id: '$category', count: { $sum: '$quantity' } } },
    { $project: { category: '$_id', count: 1, _id: 0 } },
  ]);

  res.json({
    totalItems,
    lowStockItems,
    expiredItems,
    totalValue: valuationResult.length > 0 ? valuationResult[0].totalValue : 0,
    categoryStock,
  });
});

// @desc    Get single item
// @route   GET /api/items/:id
// @access  Private
const getItemById = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (item) {
    res.json(item);
  } else {
    res.status(404);
    throw new Error('Item not found');
  }
});

// @desc    Create an item
// @route   POST /api/items
// @access  Private/Admin/Manager
const createItem = asyncHandler(async (req, res) => {
  const { name, sku, category, quantity, supplier, purchaseDate, expiryDate, price } = req.body;

  const skuExists = await Item.findOne({ sku });

  if (skuExists) {
    res.status(400);
    throw new Error('Item with this SKU already exists');
  }

  const item = await Item.create({
    user: req.user._id,
    name,
    sku,
    category,
    quantity,
    supplier,
    purchaseDate,
    expiryDate,
    price,
  });

  if (item) {
    res.status(201).json(item);
  } else {
    res.status(400);
    throw new Error('Invalid item data');
  }
});

// @desc    Update an item
// @route   PUT /api/items/:id
// @access  Private/Admin/Manager
const updateItem = asyncHandler(async (req, res) => {
  const { name, sku, category, quantity, supplier, purchaseDate, expiryDate, price } = req.body;

  const item = await Item.findById(req.params.id);

  if (item) {
    item.name = name || item.name;
    item.sku = sku || item.sku;
    item.category = category || item.category;
    item.quantity = quantity !== undefined ? quantity : item.quantity;
    item.supplier = supplier || item.supplier;
    item.purchaseDate = purchaseDate || item.purchaseDate;
    item.expiryDate = expiryDate || item.expiryDate;
    item.price = price !== undefined ? price : item.price;

    const updatedItem = await item.save();
    res.json(updatedItem);
  } else {
    res.status(404);
    throw new Error('Item not found');
  }
});

// @desc    Delete an item
// @route   DELETE /api/items/:id
// @access  Private/Admin/Manager
const deleteItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (item) {
    await item.deleteOne();
    res.json({ message: 'Item removed' });
  } else {
    res.status(404);
    throw new Error('Item not found');
  }
});

module.exports = {
  getItems,
  getInventoryStats,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};
