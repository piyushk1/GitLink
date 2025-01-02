const axios = require("axios");

const getGitHubUserData = async (username) => {
  const url = `https://api.github.com/users/${username}`;
  const response = await axios.get(url);

  if (!response.data) {
    throw new Error("Failed to fetch GitHub user data");
  }

  return {
    github_username: response.data.login,
    location: response.data.location || null,
    bio: response.data.bio || null,
    blog: response.data.blog || null,
    public_repos: response.data.public_repos,
    public_gists: response.data.public_gists,
    followers: response.data.followers,
    following: response.data.following,
  };
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
