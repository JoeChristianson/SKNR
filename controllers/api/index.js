const router = require('express').Router();
const userRoutes = require("./userRoutes");
const habitRoutes = require("./habitRoutes")
const toDoRoutes = require("./toDoRoutes")

router.use('/users', userRoutes);
router.use("/todos",toDoRoutes)
// router.use('/habits',habitRoutes)

module.exports = router;
