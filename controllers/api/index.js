const router = require('express').Router();
const userRoutes = require("./userRoutes");
const habitRoutes = require("./habitRoutes")
const toDoRoutes = require("./toDoRoutes")
const assessmentRoutes = require("./assessmentRoutes")
const queueRoutes = require("./queueRoutes")

router.use('/users', userRoutes);
router.use("/todos",toDoRoutes)
router.use('/assessments',assessmentRoutes)
router.use("/queue",queueRoutes)
// router.use('/habits',habitRoutes)

module.exports = router;
