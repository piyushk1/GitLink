const { getGitHubUserData, getMutualFollowers } = require("../services/apiService");
const { saveUserData, findUserByCriteria, deleteUser, updateUserData, getAllUsersSorted } = require("../models/model");

const addUser = async (req, res) => {
  const { username } = req.params;
  try {
    const userData = await getGitHubUserData(username);
    await saveUserData(userData);
    res.status(200).json({ message: "User data saved successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const findFriends = async (req, res) => {
  const { usernameA, usernameB } = req.params;
  try {
    const mutualFollowers = await getMutualFollowers(usernameA, usernameB);
    res.status(200).json({ mutualFollowers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchUsers = async (req, res) => {
  const { criteria } = req.query;
  try {
    const users = await findUserByCriteria(criteria);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const softDeleteUser = async (req, res) => {
  const { username } = req.params;
  try {
    await deleteUser(username);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  const { username } = req.params;
  const updateData = req.body;
  try {
    await updateUserData(username, updateData);
    res.status(200).json({ message: "User data updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUsersSorted = async (req, res) => {
  const { sortBy } = req.query;
  try {
    const users = await getAllUsersSorted(sortBy);
    console.log("Users are :",users);
    res.status(200).json(users);
    
  } catch (error) {
    console.log("error is",error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addUser,
  findFriends,
  searchUsers,
  softDeleteUser,
  updateUser,
  getUsersSorted,
};
