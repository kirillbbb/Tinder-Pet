import { useState } from 'react'
import { login } from '@/shared/api/auth'
import { useAppStore } from '@/shared/model/store'
import { useNavigate } from 'react-router-dom'

export const LoginPage = () => {
    const navigate = useNavigate()
    const fetchUser = useAppStore(state => state.fetchUser)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
        try {
            await login(username, password)
            await fetchUser()

            // 🔥 редирект
            navigate('/feed')

        } catch (e) {
            console.error(e)
            alert('Ошибка логина')
        }
    }

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm flex flex-col gap-3">

                <h2 className="text-xl font-semibold text-center">
                    Вход
                </h2>

                <input
                    placeholder="Username"
                    className="border p-2 rounded-lg"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="border p-2 rounded-lg"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                <button
                    onClick={handleLogin}
                    className="bg-[#C65D6D] text-white py-2 rounded-lg active:scale-95 transition"
                >
                    Войти
                </button>

            </div>

        </div>
    )
}