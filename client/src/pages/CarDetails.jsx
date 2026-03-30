import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getCarById, deleteCar } from '../services/CarsAPI'
import '../App.css'

const CarDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [car, setCar] = useState(null)

    useEffect(() => {
        const fetchCar = async () => {
            const data = await getCarById(id)
            setCar(data)
        }
        fetchCar()
    }, [id])

    const handleDelete = async () => {
        await deleteCar(id)
        navigate('/customcars')
    }

    if (!car) {
        return <div><center><h2 style={{color: 'white'}}>Loading...</h2></center></div>
    }

    const getPreviewStyle = () => {
        let bgColor = '#aaaaaa'
        if (car.exterior_name) {
            if (car.exterior_name.includes('Red')) bgColor = '#ff4d4d'
            else if (car.exterior_name.includes('Blue')) bgColor = '#4da6ff'
            else if (car.exterior_name.includes('Silver')) bgColor = '#silver'
        }
        return {
            width: '100%', height: '150px', backgroundColor: bgColor, borderRadius: '15px', 
            margin: '20px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', 
            color: '#fff', fontSize: '24px', fontWeight: 'bold', textShadow: '1px 1px 2px #000'
        }
    }

    return (
        <div className="car-details" style={{padding: '30px', maxWidth: '800px', margin: '40px auto', backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)'}}>
            <center><h2 style={{color: '#d11a2a', fontSize: '36px', borderBottom: '2px solid #ccc', paddingBottom: '10px'}}>{car.name}</h2></center>
            
            <div style={getPreviewStyle()}>
                {car.exterior_name ? car.exterior_name + ' Body' : 'Car Preview'}
            </div>

            <div className="details-card" style={{fontSize: '18px'}}>
                <p><strong>Total Price:</strong> ${car.price}</p>
                <div style={{display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #ddd', paddingTop: '10px', marginTop: '10px'}}>
                    <p><strong>Exterior:</strong> {car.exterior_name} (+${car.exterior_price})</p>
                    <p><strong>Roof:</strong> {car.roof_name} (+${car.roof_price})</p>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <p><strong>Wheels:</strong> {car.wheels_name} (+${car.wheels_price})</p>
                    <p><strong>Interior:</strong> {car.interior_name} (+${car.interior_price})</p>
                </div>
                
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '30px', gap: '20px'}}>
                    <Link to={`/edit/${car.id}`} style={{textDecoration: 'none', width: '40%'}}>
                        <button style={{width: '100%', padding: '12px', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '5px', fontSize: '18px', cursor: 'pointer', fontWeight: 'bold'}}>Edit</button>
                    </Link>
                    <button onClick={handleDelete} style={{width: '40%', padding: '12px', backgroundColor: '#ff4d4d', color: 'white', border: 'none', borderRadius: '5px', fontSize: '18px', cursor: 'pointer', fontWeight: 'bold'}}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default CarDetails