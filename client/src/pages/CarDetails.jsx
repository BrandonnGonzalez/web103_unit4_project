import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getItemById } from '../services/CarsAPI'
import '../App.css'

const CarDetails = () => {
    const { id } = useParams()
    const [car, setCar] = useState(null)

    useEffect(() => {
        const fetchCar = async () => {
            const data = await getItemById(id)
            setCar(data)
        }
        fetchCar()
    }, [id])

    if (!car) {
        return <div><center><h2>Loading...</h2></center></div>
    }

    return (
        <div className="car-details">
            <center><h2>{car.name}</h2></center>
            <div className="details-card" style={{border: '1px solid #ccc', margin: '20px auto', padding: '20px', borderRadius: '5px', width: '50%', backgroundColor: 'rgba(255,255,255,0.8)'}}>
                <p><strong>Price:</strong> ${car.price}</p>
                <p><strong>Category:</strong> {car.category}</p>
                <Link to={`/edit/${car.id}`}>
                    <button>Edit</button>
                </Link>
            </div>
        </div>
    )
}

export default CarDetails