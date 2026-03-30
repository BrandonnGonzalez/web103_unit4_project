import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getItems } from '../services/CarsAPI'
import '../App.css'

const ViewCars = () => {
    const [cars, setCars] = useState([])

    useEffect(() => {
        const fetchCars = async () => {
            const data = await getItems()
            setCars(data)
        }
        fetchCars()
    }, [])

    return (
        <div className="view-cars">
            <center><h2>All Items</h2></center>
            <div className="cars-container">
                {cars && cars.length > 0 ? (
                    cars.map((car) => (
                        <div key={car.id} className="car-card" style={{border: '1px solid #ccc', margin: '10px', padding: '10px', borderRadius: '5px', backgroundColor: 'rgba(255,255,255,0.8)'}}>
                            <h3>{car.name}</h3>
                            <p><strong>Price:</strong> ${car.price}</p>
                            <p><strong>Category:</strong> {car.category}</p>
                            <Link to={`/customcars/${car.id}`}>
                                <button>Details</button>
                            </Link>
                        </div>
                    ))
                ) : (
                    <h3><center>No items available.</center></h3>
                )}
            </div>
        </div>
    )
}

export default ViewCars