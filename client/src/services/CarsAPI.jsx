
const BASE_URL = 'http://localhost:3000/api/items'

export const getItems = async () => {
    const response = await fetch(BASE_URL)
    return response.json()
}

export const getItemById = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`)
    return response.json()
}

export const createItem = async (item) => {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
    return response.json()
}

export const updateItem = async (id, item) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
    return response.json()
}

export const deleteItem = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE'
    })
    return response.json()
}   