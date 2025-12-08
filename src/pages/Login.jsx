import { Lock, Mail, User2Icon } from 'lucide-react'
import React from 'react'
import api from '../configs/api'
import { useDispatch } from 'react-redux'
import { login } from '../app/features/authSlice'
import toast from 'react-hot-toast'

const Login = () => {

    const dispatch = useDispatch()
    const query = new URLSearchParams(window.location.search)
    const urlState = query.get('state')
    const [state, setState] = React.useState(urlState || "login")

    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await api.post(`/api/users/${state}`, formData)
            dispatch(login(data))
            localStorage.setItem('token', data.token)
            toast.success(data.message)
        } catch (error) {
            toast(error?.response?.data?.message || error.message)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }
    return (
        <div className='flex items-center justify-center min-h-screen px-4'>
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-violet-600/20 blur-[100px]" />
                <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-pink-500/20 blur-[100px]" />
            </div>

            <form onSubmit={handleSubmit} className="glass-card w-full max-w-md p-8 rounded-2xl relative z-10 border border-white/10">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                        {state === "login" ? "Welcome Back" : "Create Account"}
                    </h1>
                    <p className="text-slate-400 text-sm mt-2">
                        {state === "login" ? "Enter your details to access your resumes" : "Get started with your resume builder journey"}
                    </p>
                </div>

                {state !== "login" && (
                    <div className="mb-4 relative group">
                        <User2Icon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-400 transition-colors pointer-events-none" />
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            className="glass-input pl-12 h-12 w-full"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                )}

                <div className="mb-4 relative group">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-400 transition-colors pointer-events-none" />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        className="glass-input pl-12 h-12 w-full"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-6 relative group">
                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-400 transition-colors pointer-events-none" />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="glass-input pl-12 h-12 w-full"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                {state === "login" && (
                    <div className="flex justify-end mb-6">
                        <button type="button" className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
                            Forgot password?
                        </button>
                    </div>
                )}

                <button type="submit" className="glass-button w-full h-12 rounded-xl text-lg font-semibold tracking-wide">
                    {state === "login" ? "Sign In" : "Sign Up"}
                </button>

                <p className="text-center mt-6 text-slate-400">
                    {state === "login" ? "Don't have an account? " : "Already have an account? "}
                    <button
                        type="button"
                        onClick={() => setState(prev => prev === "login" ? "register" : "login")}
                        className="text-violet-400 hover:text-violet-300 font-medium hover:underline transition-all"
                    >
                        {state === "login" ? "Create one" : "Login"}
                    </button>
                </p>
            </form>
        </div>
    )
}

export default Login
