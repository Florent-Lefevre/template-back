const router = require('express').Router();
const foodRouter = require('./food.routes');

router.use('/food', foodRouter);

module.exports = router;