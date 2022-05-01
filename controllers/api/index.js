const router = require('express').Router();
const userRoutes = require("./userRoutes");
const habitRoutes = require("./habitRoutes")
const toDoRoutes = require("./toDoRoutes")
const assessmentRoutes = require("./assessmentRoutes")

router.use('/users', userRoutes);
router.use("/todos",toDoRoutes)
router.use('/assessments',assessmentRoutes)
// router.use('/habits',habitRoutes)

module.exports = router;
