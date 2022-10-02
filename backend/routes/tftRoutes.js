const express = require('express')
const router = express.Router()
const {
    getTftMatches,
    getSummoner
} = require('../controller/tftController')


router.route('/').get(getSummoner)
// router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal)

module.exports = router