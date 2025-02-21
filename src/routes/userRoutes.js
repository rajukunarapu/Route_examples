const express = require('express');
const { getAllUsersData, getUserData, updateUser, deleteUser, profile } = require('../controllers/userController');


const router = express.Router();

router.get('/feed', getAllUsersData)
router.get('/getUser/:id', getUserData)
router.patch('/updateUser', updateUser)
router.get('/deleteUser', deleteUser)
router.get('/profile', profile)

module.exports = router;