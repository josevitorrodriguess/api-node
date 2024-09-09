const  express = require('express')
const  tasksController = require('./controllers/tasksController')
const router = express.Router()




router.get('/tasks', tasksController.getAll)
router.post('/tasks',tasksController.createTask)
router.get('/tasks/:id',tasksController.getTaskById)
router.delete('/tasks/:id',tasksController.deleteTaskById)

module.exports = router