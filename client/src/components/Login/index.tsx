import { useState } from 'react'
import axios from 'axios'

export default function Login() {

    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    })

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }))
    }

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()

        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/login`, credentials, {withCredentials: true})
            if (response.status === 200) {
                console.log('response', response)
            }
        } catch(error: any) {
            console.log(error)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='username'
                    onChange={handleChange} />
                <input
                    type='text'
                    placeholder='password'
                    onChange={handleChange} />
                <button onClick={handleSubmit}>
                    Sign In
                </button>
            </form>
        </>
    )
}
