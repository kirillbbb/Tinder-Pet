const BASE = 'http://127.0.0.1:8000/api'

export const createAnimal = (formData: FormData) => {
    return fetch(`${BASE}/animals/create/`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: formData,
    })
}



export const deleteAnimal = async (id: number) => {
    const res = await fetch(`${BASE}/animals/${id}/delete/`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    })

    if (!res.ok) {
        throw new Error('Delete failed')
    }
}

export const updateAnimal = async (id: number, data: any) => {
    const res = await fetch(`${BASE}/animals/${id}/update/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(data),
    })

    const json = await res.json()

    if (!res.ok) {
        throw new Error('Update failed')
    }

    return json
}