import { useState, useEffect } from 'react'
import ProtectedRoute from '../components/ProtectedRoute'
import { toast } from 'react-toastify'
import api from '../api/api'
import { motion, AnimatePresence } from 'framer-motion'

import StatsComponent from './admin/StatsComponent'
import ManageVoters from './admin/ManageVoters'
import ManageCandidates from './admin/ManageCandidates'
import ManageElections from './admin/ManageElections'
import ElectionResults from './admin/ElectionResults'

export default function AdminDashboard() {
  const [tab, setTab] = useState('stats')
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState(null)
  const [voters, setVoters] = useState([])
  const [candidates, setCandidates] = useState([])
  const [elections, setElections] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, votersRes, candidatesRes, electionsRes] = await Promise.all([
          api.get('/admin/stats'),
          api.get('/admin/voters'),
          api.get('/admin/candidates'),
          api.get('/elections').catch(() => ({ data: [] })),
        ])
        setStats(statsRes.data)
        setVoters(votersRes.data.voteres || [])
        setCandidates(candidatesRes.data.candidates || [])
        setElections(electionsRes.data.elections || [])
      } catch {
        toast.error('Failed to fetch admin data')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading)
    return (
      <div className="p-12 text-center text-slate-600 dark:text-slate-400">
        Loading dashboard…
      </div>
    )

  const tabs = [
    { id: 'stats', label: 'Stats' },
    { id: 'voters', label: 'Voters' },
    { id: 'candidates', label: 'Candidates' },
    { id: 'elections', label: 'Elections' },
    { id: 'results', label: 'Results' },
  ]

  return (
    <ProtectedRoute role="super_admin">
      <div className="p-6 lg:p-10 space-y-8">
        <h2 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">
          Admin Dashboard
        </h2>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 text-sm rounded-lg border font-medium transition-colors
                ${
                  tab === t.id
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm p-6"
          >
            {tab === 'stats' && <StatsComponent stats={stats} />}
            {tab === 'voters' && <ManageVoters voters={voters} setVoters={setVoters} />}
            {tab === 'candidates' && (
              <ManageCandidates candidates={candidates} setCandidates={setCandidates} />
            )}
            {tab === 'elections' && (
              <ManageElections elections={elections} setElections={setElections} />
            )}
            {tab === 'results' && <ElectionResults elections={elections} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </ProtectedRoute>
  )
}
