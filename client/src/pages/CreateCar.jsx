import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getItems, createCar } from '../services/CarsAPI'
import { calculateTotalPrice } from '../utilities/calcPrice'
import { checkFeatureCombinations } from '../utilities/validation'
import '../App.css'

const CreateCar = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [availableOptions, setAvailableOptions] = useState([])
    const [features, setFeatures] = useState({
        exterior: null,
        roof: null,
        wheels: null,
        interior: null
    })
    const [errorMsg, setErrorMsg] = useState('')

    useEffect(() => {
        const fetchOptions = async () => {
            const data = await getItems()
            setAvailableOptions(data)
        }
        fetchOptions()
    }, [])

    const handleFeatureSelect = (category, optionId) => {
        const option = availableOptions.find(opt => opt.id === parseInt(optionId))
        setFeatures(prev => ({
            ...prev,
            [category]: option
        }))
    }

    const calcTotal = () => {
        const selectedOptions = Object.values(features).filter(opt => opt !== null)
        const optionsTotal = calculateTotalPrice(selectedOptions)
        return 20000 + optionsTotal; // Base price is 20,000
    }

    const handleCreateCar = async (event) => {
        event.preventDefault()
        const validation = checkFeatureCombinations(features)
        if (!validation.isValid) {
            setErrorMsg(validation.message)
            return
        }

        if (!name) {
            setErrorMsg('Name is required.')
            return
        }

        const newCar = {
            name: name,
            exterior_id: features.exterior.id,
            roof_id: features.roof.id,
            wheels_id: features.wheels.id,
            interior_id: features.interior.id,
            price: calcTotal()
        }

        try {
            await createCar(newCar)
            navigate('/customcars')
        } catch (err) {
            setErrorMsg('Failed to save car. Impossible combination maybe?')
        }
    }

    // Determine visual style based on exterior selection
    const getPreviewStyle = () => {
        let bgColor = '#aaaaaa'
        if (features.exterior) {
            if (features.exterior.name.includes('Red')) bgColor = '#ff4d4d'
            else if (features.exterior.name.includes('Blue')) bgColor = '#4da6ff'
            else if (features.exterior.name.includes('Silver')) bgColor = '#silver'
        }
        return {
            width: '100%', height: '150px', backgroundColor: bgColor, borderRadius: '15px', 
            margin: '20px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', 
            color: '#fff', fontSize: '24px', fontWeight: 'bold', textShadow: '1px 1px 2px #000'
        }
    }

    const renderOptions = (category) => {
        const opts = availableOptions.filter(opt => opt.category === category)
        return (
            <div className="option-group" style={{marginBottom: '15px'}}>
                <label style={{textTransform: 'capitalize'}}><strong>{category}:</strong></label><br/>
                <select onChange={(e) => handleFeatureSelect(category, e.target.value)} defaultValue="" style={{width: '100%', padding: '10px', borderRadius: '5px'}}>
                    <option value="" disabled>Select {category}...</option>
                    {opts.map(opt => (
                        <option key={opt.id} value={opt.id}>{opt.name} (+${opt.price})</option>
                    ))}
                </select>
            </div>
        )
    }

    return (
        <div className="create-car" style={{padding: '30px', maxWidth: '800px', margin: '40px auto', backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)'}}>
            <center><h2 style={{color: '#333'}}>Customize Your Car</h2></center>
            
            <div style={getPreviewStyle()}>
                {features.exterior ? features.exterior.name + ' Body' : 'Select an Exterior Color'}
            </div>

            {errorMsg && <p style={{color: 'red', textAlign: 'center', fontWeight: 'bold'}}>{errorMsg}</p>}

            <form onSubmit={handleCreateCar}>
                <label><strong>Car Name:</strong></label> <br />
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{width: '100%', padding: '10px', borderRadius: '5px'}}/>
                <br /><br />
                
                {renderOptions('exterior')}
                {renderOptions('roof')}
                {renderOptions('wheels')}
                {renderOptions('interior')}

                <h3 style={{marginTop: '20px', color: '#111', fontSize: '24px'}}>Total Price: ${calcTotal()}</h3>

                <input type="submit" value="Save Car" style={{width: '100%', padding: '15px', backgroundColor: '#d11a2a', color: 'white', border: 'none', borderRadius: '5px', fontSize: '18px', cursor: 'pointer', fontWeight: 'bold'}}/>
            </form>
        </div>
    )
}

export default CreateCar