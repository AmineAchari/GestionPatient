const express = require('express')
const docController = require('../api/Doctor.Controller')

const router = express.Router()

router.post('/api/doctor/create', docController.create)
router.get('/api/doctor/getAll', docController.getAll)





module.exports = router;


