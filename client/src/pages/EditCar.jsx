import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getItemById, updateItem, deleteItem } from '../services/CarsAPI'
import '../App.css'

const EditCar = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [car, setCar] = useState({ id: 0, name: '', price: '', category: '' })

    useEffect(() => {
        const fetchCar = async () => {
            const data = await getItemById(id)
            setCar(data)
        }
        fetchCar()
    }, [id])

    const handleChange = (event) => {
        const { name, value } = event.target
        setCar((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    const editCar = async (event) => {
        event.preventDefault()
        await updateItem(id, car)
        navigate('/customcars')
    }

    const deleteCar = async (event) => {
        event.preventDefault()
        await deleteItem(id)
        navigate('/customcars')
    }

    return (
        <div className="edit-car">
            <center><h2>Edit Item</h2></center>
            <form>
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
                <button onClick={editCar}>Update</button>
                <button onClick={deleteCar} style={{marginLeft: '10px', backgroundColor: 'red', color: 'white'}}>Delete</button>
            </form>
        </div>
    )
}

export default EditCar