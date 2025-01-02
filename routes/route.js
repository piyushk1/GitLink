const express = require("express");
const router = express.Router();
const { addUser, findFriends, searchUsers, softDeleteUser, updateUser, getUsersSorted } = require("../controllers/controller");

router.post("/user/:username", addUser);
router.get("/friends/:usernameA/:usernameB", findFriends);
router.get("/search", searchUsers);
router.delete("/user/:username", softDeleteUser);
router.put("/user/:username", updateUser);
router.get("/users", getUsersSorted);

module.exports = router;
