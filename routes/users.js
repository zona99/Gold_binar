var express = require('express');
var router = express.Router();
const userController = require('../app/controller/userController');
const checkUser = require('../app/middleware/middlewareUser');

/* GET users listing. */
router.get('/', userController.getAllUser);
router.get('/(:id)', checkUser.checkIsUser,userController.getOneUser);
router.post('/create', checkUser.checkIsUser,userController.addUser);
router.patch('/update/:id', userController.updateUser);
router.delete('/delete', userController.deleteUser);

module.exports = router;