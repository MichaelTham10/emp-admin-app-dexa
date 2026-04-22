import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { empApi, loginUrl } from '../constants/UrlConstans'
import { RequestLoginForm } from '../interfaces/Request/RequestLoginForm'
import { ErrorLoginForm } from '../interfaces/Errors/ErrorLoginForm'
import { ResponseLoginForm } from '../interfaces/Response/ResponseLoginForm'



export function LoginPage() {
    const [form, setForm] = useState<RequestLoginForm>({ email: '', password: '' })
    const [errors, setErrors] = useState<ErrorLoginForm>({})
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()

    const { mutate: login, isPending, isError } = useMutation<ResponseLoginForm, Error, RequestLoginForm>({
        mutationFn: async (payload) => {
            const { data } = await empApi.post<ResponseLoginForm>(loginUrl, payload)
            return data
        },
        onSuccess: (data) => {
            localStorage.setItem('token', data.accessToken)
            navigate('/admin')
        },
    })

    const validate = (): boolean => {
        const newErrors: ErrorLoginForm = {}
        if (!form.email) newErrors.email = 'Email is required'
        if (!form.password) newErrors.password = 'Password is required'
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = () => {
        if (!validate()) return
        login(form)
    }
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white border border-gray-200 rounded-xl p-8 w-full max-w-sm">

                <h1 className="text-xl font-medium text-gray-900 mb-1">Employee App</h1>

                {isError && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-2.5 mb-4">
                        Email or password is incorrect
                    </div>
                )}

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600 mb-1.5">Email</label>
                    <input
                        type="email"
                        placeholder="name@email.com"
                        value={form.email}
                        onChange={e => {
                            setForm(prev => ({ ...prev, email: e.target.value }))
                            setErrors(prev => ({ ...prev, email: undefined }))
                        }}
                        className={`w-full h-10 px-3 border rounded-lg text-sm outline-none transition
              focus:ring-2 focus:ring-blue-100 focus:border-blue-500
              ${errors.email ? 'border-red-400' : 'border-gray-300'}`}
                    />
                    {errors.email && (
                        <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600 mb-1.5">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Input your password"
                            value={form.password}
                            onChange={e => {
                                setForm(prev => ({ ...prev, password: e.target.value }))
                                setErrors(prev => ({ ...prev, password: undefined }))
                            }}
                            className={`w-full h-10 px-3 pr-24 border rounded-lg text-sm outline-none transition
                focus:ring-2 focus:ring-blue-100 focus:border-blue-500
                ${errors.password ? 'border-red-400' : 'border-gray-300'}`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(prev => !prev)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                    )}
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={isPending}
                    className="w-full h-10 bg-blue-600 hover:bg-blue-700 disabled:opacity-60
            text-white text-sm font-medium rounded-lg mt-2"
                >
                    {isPending ? 'Loading...' : 'Login'}
                </button>

            </div>
        </div>
    )
}