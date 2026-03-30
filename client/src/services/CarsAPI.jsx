
const BASE_URL = 'http://localhost:3000/api/items'
const CARS_URL = 'http://localhost:3000/api/cars'

export const getItems = async () => {
    const response = await fetch(BASE_URL)
    return response.json()
}

export const getCars = async () => {
    const response = await fetch(CARS_URL)
    return response.json()
}

export const getCarById = async (id) => {
    const response = await fetch(`${CARS_URL}/${id}`)
    return response.json()
}

export const createCar = async (car) => {
    const response = await fetch(CARS_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(car)
    })
    return response.json()
}

export const updateCar = async (id, car) => {
    const response = await fetch(`${CARS_URL}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(car)
    })
    return response.json()
}

export const deleteCar = async (id) => {
    const response = await fetch(`${CARS_URL}/${id}`, {
        method: 'DELETE'
    })
    return response.json()
}