const axios = require("axios");

const getGitHubUserData = async (username) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch GitHub data");
  }
};

const getMutualFollowers = async (userA, userB) => {
  try {
    const [userAData, userBData] = await Promise.all([
      axios.get(`https://api.github.com/users/${userA}/followers`),
      axios.get(`https://api.github.com/users/${userB}/followers`),
    ]);
    const userAFollowers = userAData.data.map((follower) => follower.login);
    const userBFollowers = userBData.data.map((follower) => follower.login);
    return userAFollowers.filter((follower) => userBFollowers.includes(follower));
  } catch (error) {
    throw new Error("Failed to fetch mutual followers");
  }
};

module.exports = {
  getGitHubUserData,
  getMutualFollowers,
};
