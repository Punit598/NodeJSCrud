const express = require('express');
const usercontroller = require('../controller/user')

const router = express.Router();
router.get('/api/getAllUser',usercontroller.getAllUser);
router.post('/api/addUser',usercontroller.addUser);
router.put('/api/updateUser',usercontroller.updateUser);
router.delete('/api/deleteUser',usercontroller.deleteUser);

module.exports = router;