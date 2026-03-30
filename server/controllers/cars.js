import { pool } from '../config/database.js'

export const getCars = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT c.*, 
                   e.name as exterior_name, e.price as exterior_price,
                   r.name as roof_name, r.price as roof_price,
                   w.name as wheels_name, w.price as wheels_price,
                   i.name as interior_name, i.price as interior_price
            FROM cars c
            JOIN custom_items e ON c.exterior_id = e.id
            JOIN custom_items r ON c.roof_id = r.id
            JOIN custom_items w ON c.wheels_id = w.id
            JOIN custom_items i ON c.interior_id = i.id
        `)
        res.json(result.rows)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const getCarById = async (req, res) => {
    try {
        const { id } = req.params
        const result = await pool.query(`
            SELECT c.*, 
                   e.name as exterior_name, e.price as exterior_price,
                   r.name as roof_name, r.price as roof_price,
                   w.name as wheels_name, w.price as wheels_price,
                   i.name as interior_name, i.price as interior_price
            FROM cars c
            JOIN custom_items e ON c.exterior_id = e.id
            JOIN custom_items r ON c.roof_id = r.id
            JOIN custom_items w ON c.wheels_id = w.id
            JOIN custom_items i ON c.interior_id = i.id
            WHERE c.id = $1
        `, [id])
        res.json(result.rows[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const createCar = async (req, res) => {
    try {
        const { name, exterior_id, roof_id, wheels_id, interior_id, price } = req.body
        const result = await pool.query(
            'INSERT INTO cars (name, exterior_id, roof_id, wheels_id, interior_id, price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [name, exterior_id, roof_id, wheels_id, interior_id, price]
        )
        res.status(201).json(result.rows[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const updateCar = async (req, res) => {
    try {
        const { id } = req.params
        const { name, exterior_id, roof_id, wheels_id, interior_id, price } = req.body
        const result = await pool.query(
            'UPDATE cars SET name=$1, exterior_id=$2, roof_id=$3, wheels_id=$4, interior_id=$5, price=$6 WHERE id=$7 RETURNING *',
            [name, exterior_id, roof_id, wheels_id, interior_id, price, id]
        )
        res.json(result.rows[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const deleteCar = async (req, res) => {
    try {
        const { id } = req.params
        const result = await pool.query('DELETE FROM cars WHERE id=$1 RETURNING *', [id])
        res.json(result.rows[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}
