const { getGitHubUserData, getMutualFollowers } = require("../services/apiService");
const { saveUserData, findUserByCriteria, deleteUser, updateUserData, getAllUsersSorted } = require("../models/model");

const addUser = async (req, res) => {
  const { username } = req.params;

  // Validate username parameter
  if (!username) {
    return res.status(400).json({ message: "Username parameter is missing" });
  }

  try {
    const userData = await getGitHubUserData(username);

    // Validate the required field
    if (!userData.github_username) {
      return res.status(400).json({ message: "GitHub username is missing" });
    }

    await saveUserData(userData);
    res.status(200).json({ message: "User data saved successfully" });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: error.message });
  }
};

const findFriends = async (req, res) => {
  const { usernameA, usernameB } = req.params;

  // Validate usernames
  if (!usernameA || !usernameB) {
    return res.status(400).json({ message: "Both usernames must be provided" });
  }

  try {
    const mutualFollowers = await getMutualFollowers(usernameA, usernameB);
    res.status(200).json({ mutualFollowers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchUsers = async (req, res) => {
  const { criteria } = req.query;

  // Validate search criteria
  if (!criteria) {
    return res.status(400).json({ message: "Search criteria must be provided" });
  }

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
    const deletedUser = await deleteUser(username);
    res.status(200).json({ message: "User soft deleted successfully", deletedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateUser = async (req, res) => {
  const { username } = req.params;
  const updateData = req.body;

  // Validate username parameter and update data
  if (!username) {
    return res.status(400).json({ message: "Username parameter is missing" });
  }

  if (!updateData || Object.keys(updateData).length === 0) {
    return res.status(400).json({ message: "Update data must be provided" });
  }

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
    console.log("Users are:", users);
    res.status(200).json(users);
  } catch (error) {
    console.log("Error is", error);
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
