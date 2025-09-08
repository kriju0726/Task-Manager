const router = require('express').Router();

const { register, login, logout } = require('../services/user');

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;


