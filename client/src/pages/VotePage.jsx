import { useEffect, useState } from 'react'
import Card from '../components/Card'
import api from '../api/api'

export default function VotePage() {
  const [election, setElection] = useState(null)
  const [candidates, setCandidates] = useState([])
  const [selected, setSelected] = useState(null)
  const [receipt, setReceipt] = useState(null)

  useEffect(() => {
    async function load() {
      const res = await api.get('/election')
      setElection(res.data.election)
      const cand = await api.get('/admin/candidates')
      setCandidates(cand.data.candidates || [])
    }
    load()
  }, [])

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-6">
      <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
        {election?.title || 'Election'}
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {candidates.map(c => {
          const isSelected = selected === c.candidateId
          return (
            <div
              key={c.candidateId}
              className={`bg-white dark:bg-slate-900 border rounded-xl p-4 shadow-sm
                ${isSelected
                  ? 'border-slate-900 dark:border-slate-100'
                  : 'border-slate-200 dark:border-slate-700'
                }`}
            >
              <img src={c.photoUrl || ''} className="h-36 w-full object-cover rounded-lg mb-3" />
              <h3 className="font-medium text-slate-900 dark:text-slate-100">{c.name}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">{c.party}</p>

              <button
                onClick={() => setSelected(c.candidateId)}
                className={`mt-4 w-full py-2 rounded-lg border text-sm font-medium
                  ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
              >
                {isSelected ? 'Selected' : 'Select'}
              </button>
            </div>
          )
        })}
      </div>

      <div className="text-center">
        <button className="px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800">
          Cast Vote
        </button>
      </div>

      {receipt && <Card receipt={receipt} />}
    </div>
  )
}
