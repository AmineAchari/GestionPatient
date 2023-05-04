const express = require('express')
const assistController = require('../api/Assistant.Controller')

const router = express.Router()

router.post('/api/assistant/create', assistController.create)
router.get('/api/assistant/getAll', assistController.getAll)




module.exports = router;