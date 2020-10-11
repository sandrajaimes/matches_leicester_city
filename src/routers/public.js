const express = require("express");
const controllerLogin = require("../controllers/loginControllers");
const controllerUser = require("../controllers/userControllers");

const router = express.Router();

router.post('/login',controllerLogin.login);
router.post('/user', controllerUser.addUser);

module.exports=router;
