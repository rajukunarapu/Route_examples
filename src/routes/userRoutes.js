const express = require('express');
const { getAllUsersData, getUserData, updateUser, deleteUser } = require('../controllers/userController');


const router = express.Router();

router.get('/getAllData', getAllUsersData)
router.get('/getUser/:id', getUserData)
router.patch('/updateUser', updateUser)
router.get('/deleteUser', deleteUser)

module.exports = router;