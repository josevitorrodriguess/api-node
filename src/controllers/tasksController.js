const { response } = require('../app')
const connection = require('../models/connection')
const taskModel = require('../models/tasksModel')


const getAll = async (req, res) => {
    try {
        const tasks = await taskModel.getAll()
        return res.status(200).json(tasks)
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching tasks' })
    }
}

const getTaskById = async (req, res) => {
    try {
        const { id } = req.params

        if (!id || isNaN(id)) {
            return res.status(400).json({ message: 'Invalid task ID' })
        }

        const task = await taskModel.getTaskById(parseInt(id))

        if (!task) {
            return res.status(404).json({ message: 'Task not found' })
        }

        return res.status(200).json(task)
    } catch (error) {
        console.error('Error fetching task by ID:', error)
        return res.status(500).json({ message: 'Error fetching task by ID' })
    }
}

const createTask = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ message: 'Request body is missing' })
        }

        const { title, description, status } = req.body

        if (!title || typeof title !== 'string' || title.trim() === '') {
            return res.status(400).json({ message: 'Title is required and must be a non-empty string' })
        }

        if (description && typeof description !== 'string') {
            return res.status(400).json({ message: 'Description must be a string' })
        }

        const validStatuses = ['complete', 'incomplete']
        if (status !== undefined && typeof status !== 'string') {
            return res.status(400).json({ message: 'Status must be a string' })
        }

        if (status && !validStatuses.includes(status.toLowerCase())) {
            return res.status(400).json({ message: `Status must be one of ${validStatuses.join(', ')}` })
        }

        const finalStatus = status ? status.toLowerCase() : 'incomplete'

        const newTask = await taskModel.insertTask(title, description || '', finalStatus)
        
        return res.status(201).json({
            message: 'Task created successfully',
            task: newTask
        })
    } catch (error) {
        console.error('Error creating task:', error)
        return res.status(500).json({ message: 'Error creating task' })
    }
}


const deleteTaskById = async (req, res) => {
    try {
        const { id } = req.params

        if (!id || isNaN(id)) {
            return res.status(400).json({ message: 'Invalid task ID' })
        }

        const deletedTask = await taskModel.deleteTaskById(parseInt(id))

        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' })
        }

        return res.status(200).json({
            message: 'Task deleted successfully',
            task: deletedTask
        })
    } catch (error) {
        console.error('Error deleting task by ID:', error)
        return res.status(500).json({ message: 'Error deleting task by ID' })
    }
}

module.exports = {
    getAll,
    getTaskById,
    createTask,
    deleteTaskById
}