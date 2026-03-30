import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createItem } from '../services/CarsAPI'
import '../App.css'

const CreateCar = () => {
    const navigate = useNavigate()
    const [car, setCar] = useState({ name: '', price: '', category: '' })

    const handleChange = (event) => {
        const { name, value } = event.target
        setCar((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    const createCar = async (event) => {
        event.preventDefault()
        await createItem(car)
        navigate('/customcars')
    }

    return (
        <div className="create-car">
            <center><h2>Create a New Item</h2></center>
            <form onSubmit={createCar}>
                <label>Name</label> <br />
                <input type="text" id="name" name="name" value={car.name} onChange={handleChange} required />
                <br />
                <br />
                <label>Price</label><br />
                <input type="number" id="price" name="price" value={car.price} onChange={handleChange} required />
                <br />
                <br />
                <label>Category</label><br />
                <input type="text" id="category" name="category" value={car.category} onChange={handleChange} required />
                <br />
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default CreateCar