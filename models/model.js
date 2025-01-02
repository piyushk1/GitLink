const db = require("../config/db");  

// Create table for users
const createUsersTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      github_username VARCHAR(100) UNIQUE NOT NULL,
      location TEXT,
      bio TEXT,
      blog TEXT,
      public_repos INTEGER,
      public_gists INTEGER,
      followers INTEGER,
      following INTEGER,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      deleted_at TIMESTAMP NULL
    );
  `;
  await db.query(query);  
};

// Add or Update user data
const saveUserData = async (userData) => {
  const query = `
    INSERT INTO users (github_username, location, bio, blog, public_repos, public_gists, followers, following)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    ON CONFLICT (github_username)
    DO UPDATE SET 
      location = EXCLUDED.location,
      bio = EXCLUDED.bio,
      blog = EXCLUDED.blog,
      public_repos = EXCLUDED.public_repos,
      public_gists = EXCLUDED.public_gists,
      followers = EXCLUDED.followers,
      following = EXCLUDED.following;
  `;
  const values = [
    userData.github_username,
    userData.location,
    userData.bio,
    userData.blog,
    userData.public_repos,
    userData.public_gists,
    userData.followers,
    userData.following,
  ];
  await db.query(query, values);  
};

// Find users based on criteria
const findUserByCriteria = async (criteria) => {
  const query = `
    SELECT * FROM users WHERE github_username LIKE $1 OR location LIKE $2;
  `;
  const values = [`%${criteria}%`, `%${criteria}%`];
  const result = await db.query(query, values);  
  return result.rows;
};

// Soft deletes a user
const deleteUser = async (username) => {
  try {
    // Set the deleted_at timestamp for the user
    const result = await db.query(
      `UPDATE users SET deleted_at = NOW() WHERE github_username = $1 RETURNING *`,
      [username]
    );
    if (result.rowCount === 0) {
      throw new Error("User not found");
    }
    return result.rows[0];
  } catch (error) {
    throw new Error("Error soft deleting user: " + error.message);
  }
};

// Update user data
const updateUserData = async (username, updateData) => {
  const { location, bio, blog } = updateData;
  const query = `
    UPDATE users
    SET location = $1, bio = $2, blog = $3
    WHERE github_username = $4;
  `;
  await db.query(query, [location, bio, blog, username]);  
};

// Get all users sorted by specified field
const getAllUsersSorted = async (sortBy) => {

const validColumns = ['public_repos','public_gists', 'followers','following', 'created_at']; 
if (!validColumns.includes(sortBy)) {
  sortBy = 'id'; 
}
  const query = `SELECT * FROM users WHERE deleted_at IS NULL ORDER BY ${sortBy} DESC;`;
  const result = await db.query(query);  
  return result.rows;};

module.exports = {
  createUsersTable,
  saveUserData,
  findUserByCriteria,
  deleteUser,
  updateUserData,
  getAllUsersSorted,
};
