import axios from 'axios';

const API_URL = '/api/users';

// Get all users
const getUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

// Update user role
const updateUserRole = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${API_URL}/profile`, userData, config);
  return response.data;
};

const userService = {
  getUsers,
  updateUserRole,
};

export default userService;
