const pool = require('./connection')

const getAll = async () => {
    try {
        const { rows: tasks } = await pool.query('SELECT * FROM tasks') 
        return tasks
    } catch (error) {
        console.error('Error fetching tasks:', error)
        throw error
    }
}

const getTaskById = async (id) => {
    const query = 'SELECT * FROM tasks WHERE id = $1'
    const values = [id]

    try {
        const { rows } = await pool.query(query, values)
        if (rows.length === 0) {
            return null 
        }
        return rows[0]
    } catch (error) {
        console.error('Error fetching task by ID:', error)
        throw error
    }
}



const insertTask = async (title, description, status) => {
    const query = `
        INSERT INTO tasks (title, description, status)
        VALUES ($1, $2, $3) 
        RETURNING *
    `
    const values = [title, description, status]

    try {
        const { rows } = await pool.query(query, values)
        return rows[0]
    } catch (error) {
        console.error('Error inserting task:', error)
        throw error
    }
}


const deleteTaskById = async (id) => {
    const query = 'DELETE FROM tasks WHERE id = $1 RETURNING *'
    const values = [id]

    try {
        const { rows } = await pool.query(query, values)
        if (rows.length === 0) {
            return null 
        }
        return rows[0]
    } catch (error) {
        console.error('Error deleting task by ID:', error)
        throw error
    }
}



module.exports = {
    getAll,
    getTaskById,
    insertTask,
    deleteTaskById
}
