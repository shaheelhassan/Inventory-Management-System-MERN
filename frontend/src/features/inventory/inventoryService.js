import axios from 'axios';

const API_URL = '/api/items/';

// Get all items
const getItems = async (token, query = '') => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + query, config);
  return response.data;
};

// Get inventory stats
const getStats = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + 'stats', config);
  return response.data;
};

// Create a new item
const createItem = async (itemData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, itemData, config);
  return response.data;
};

// Update an item
const updateItem = async (itemId, itemData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + itemId, itemData, config);
  return response.data;
};

// Delete an item
const deleteItem = async (itemId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + itemId, config);
  return response.data;
};

const inventoryService = {
  getItems,
  getStats,
  createItem,
  updateItem,
  deleteItem,
};

export default inventoryService;
