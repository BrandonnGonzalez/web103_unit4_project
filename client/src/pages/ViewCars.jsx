import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getCars, deleteCar } from '../services/CarsAPI'
import '../App.css'

const ViewCars = () => {
    const [cars, setCars] = useState([])

    useEffect(() => {
        fetchCars()
    }, [])

    const fetchCars = async () => {
        const data = await getCars()
        setCars(data)
    }

    const handleDelete = async (id) => {
        await deleteCar(id)
        fetchCars()
    }

    return (
        <div className="view-cars" style={{padding: '30px', maxWidth: '1000px', margin: '0 auto'}}>
            <center><h2 style={{color: 'white', textShadow: '2px 2px 4px #000'}}>Custom Cars</h2></center>
            <div className="cars-container" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                {cars && cars.length > 0 ? (
                    cars.map((car) => (
                        <div key={car.id} className="car-card" style={{border: '1px solid #ccc', margin: '15px', padding: '20px', borderRadius: '10px', backgroundColor: 'rgba(255,255,255,0.95)', width: '300px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)'}}>
                            <h3 style={{color: '#d11a2a', borderBottom: '2px solid #ccc', paddingBottom: '10px', marginTop: '0'}}>{car.name}</h3>
                            <p><strong>Price:</strong> ${car.price}</p>
                            <p><strong>Exterior:</strong> {car.exterior_name}</p>
                            <p><strong>Roof:</strong> {car.roof_name}</p>
                            <p><strong>Wheels:</strong> {car.wheels_name}</p>
                            <p><strong>Interior:</strong> {car.interior_name}</p>
                            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '15px'}}>
                                <Link to={`/customcars/${car.id}`} style={{textDecoration: 'none'}}>
                                    <button style={{padding: '8px 12px', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer'}}>Details</button>
                                </Link>
                                <Link to={`/edit/${car.id}`} style={{textDecoration: 'none'}}>
                                    <button style={{padding: '8px 12px', backgroundColor: '#4da6ff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer'}}>Edit</button>
                                </Link>
                                <button onClick={() => handleDelete(car.id)} style={{padding: '8px 12px', backgroundColor: '#ff4d4d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer'}}>Delete</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <h3 style={{color: 'white', textShadow: '2px 2px 4px #000'}}><center>No items available.</center></h3>
                )}
            </div>
        </div>
    )
}

export default ViewCars