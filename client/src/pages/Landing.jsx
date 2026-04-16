import AnimatedPage from '../components/AnimatedPage'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import api from '../api/api.js'

export default function Landing() {
  const { t } = useTranslation()
  const [elections, setElections] = useState([])
  const [results, setResults] = useState({})

  useEffect(() => {
    const getElections = async () => {
      const res = await api.get('/admin/elections', { withCredentials: true })
      setElections(res.data.elections || [])
    }
    getElections()
  }, [])

  return (
    <AnimatedPage>
      <div className="max-w-6xl mx-auto px-8 py-12 space-y-10">
        <header>
          <h1 className="text-4xl font-semibold text-slate-900 dark:text-slate-100">
            {t('appTitle')}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-3">
            {t('intro')}
          </p>
        </header>

        <section className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              {t('welcome')}
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400">
              {t('intro')}
            </p>

            <div className="mt-6 flex gap-4">
              <Link
                to="/voter/login"
                className="px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800"
              >
                {t('voterLogin')}
              </Link>
              <Link
                to="/admin/login"
                className="px-6 py-3 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                {t('adminLogin')}
              </Link>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-md p-8">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
              {t('featuresTitle')}
            </h3>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
              <li>• {t('feature_secure')}</li>
              <li>• {t('feature_biometric_demo')}</li>
              <li>• {t('feature_multilang')}</li>
            </ul>
          </div>
        </section>
      </div>
    </AnimatedPage>
  )
}
