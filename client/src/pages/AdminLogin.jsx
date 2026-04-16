import { useState } from 'react'
import api from '../api/api'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { setUser } = useAuth()
  const nav = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post('/admin/login', { username, password })
      toast.success('Login successful')
      setUser(res.data.user)
      nav('/admin')
    } catch (err) {
      toast.error('Login failed')
    }
  }

  return (
    <div className="max-w-md mx-auto p-8">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-6 text-center">
          Admin Login
        </h2>

        <form onSubmit={submit} className="space-y-5">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-slate-400"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-slate-400"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
