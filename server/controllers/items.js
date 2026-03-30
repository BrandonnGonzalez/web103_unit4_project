import { pool } from "../config/database.js";

export const getItems = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM custom_items')
        res.json(result.rows)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Error fetching items' })
    }
}

export const getItemById = async (req, res) => {
    try {
        const { id } = req.params
        const result = await pool.query('SELECT * FROM custom_items WHERE id = $1', [id])
        res.json(result.rows[0])
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Error fetching item' })
    }
}

export const createItem = async (req, res) => {
    try {
        const { name, price, category } = req.body
        const result = await pool.query(
            'INSERT INTO custom_items (name, price, category) VALUES ($1, $2, $3) RETURNING *',
            [name, price, category]
        )
        res.status(201).json(result.rows[0])
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Error creating item' })
    }
}

export const updateItem = async (req, res) => {
    try {
        const { id } = req.params
        const { name, price, category } = req.body
        const result = await pool.query(
            'UPDATE custom_items SET name = $1, price = $2, category = $3 WHERE id = $4 RETURNING *',
            [name, price, category, id]
        )
        res.json(result.rows[0])
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Error updating item' })
    }
}

export const deleteItem = async (req, res) => {
    try {
        const { id } = req.params
        const result = await pool.query(
            'DELETE FROM custom_items WHERE id = $1 RETURNING *',
            [id]
        )
        res.json(result.rows[0])
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Error deleting item' })
    }
}       
