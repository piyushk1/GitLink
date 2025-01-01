const express = require('express');
const {
  saveGithubUser,
  findMutualConnections,
  searchGithubUsers,
  softDeleteUser,
  updateUserInfo,
  sortGithubUsers,
} = require('../controllers/controller');

const router = express.Router();

router.post('/:username', saveGithubUser);
router.post('/:username/friends', findMutualConnections);
router.get('/search', searchGithubUsers);
router.delete('/:username', softDeleteUser);
router.patch('/:username', updateUserInfo);
router.get('/sort', sortGithubUsers);

module.exports = router;
