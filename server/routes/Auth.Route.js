const express = require('express')
const authController = require('../api/Auth.Controller')

const router = express.Router()

router.post('/api/login', authController.login)



module.exports = router;
