const express = require('express');
const router = express.Router();
const { updateDatabase, getDatabase, getSummoner } = require('../controller/tftController');
router.route('/').get(getDatabase);
// router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal)

module.exports = router;
