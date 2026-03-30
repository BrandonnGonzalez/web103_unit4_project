import { pool } from './database.js'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '../.env') })

const createCustomItemsTable = async () => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS custom_items (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            price INTEGER NOT NULL,
            category VARCHAR(255) NOT NULL
        )
    `

    try {
        await pool.query(createTableQuery)
        console.log('🎉 custom_items table created successfully')
    } catch (err) {
        console.error('⚠️ error creating custom_items table', err)
    }
}

const createCarsTable = async () => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS cars (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            exterior_id INTEGER NOT NULL REFERENCES custom_items(id),
            roof_id INTEGER NOT NULL REFERENCES custom_items(id),
            wheels_id INTEGER NOT NULL REFERENCES custom_items(id),
            interior_id INTEGER NOT NULL REFERENCES custom_items(id),
            price INTEGER NOT NULL
        )
    `

    try {
        await pool.query(createTableQuery)
        console.log('🎉 cars table created successfully')
    } catch (err) {
        console.error('⚠️ error creating cars table', err)
    }
}

const seed = async () => {
    await createCustomItemsTable()
    await createCarsTable()
}

seed()
