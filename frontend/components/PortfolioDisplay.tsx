'use client'

import { useState } from 'react'
import { useWallet } from '@aptos-labs/wallet-adapter-react'
import { 
  AcademicCapIcon, 
  UserGroupIcon, 
  CalendarIcon, 
  ChartBarIcon,
  CheckBadgeIcon,
  PencilIcon,
  ExternalLinkIcon
} from '@heroicons/react/24/outline'
import { updatePortfolioStats } from '@/utils/aptos'

interface Portfolio {
  name: string
  subject: string
  students_taught: number
  years_experience: number
  impact_score: number
  verified: boolean
  metadata_uri: string
  created_at: number
}

interface PortfolioDisplayProps {
  portfolio: Portfolio
  onUpdate: () => void
}

export default function PortfolioDisplay({ portfolio, onUpdate }: PortfolioDisplayProps) {
  const { signAndSubmitTransaction } = useWallet()
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const [updateData, setUpdateData] = useState({
    additionalStudents: '',
    additionalYears: '',
  })
  const [loading, setLoading] = useState(false)

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await updatePortfolioStats(
        signAndSubmitTransaction,
        parseInt(updateData.additionalStudents) || 0,
        parseInt(updateData.additionalYears) || 0
      )
      
      setShowUpdateForm(false)
      setUpdateData({ additionalStudents: '', additionalYears: '' })
      onUpdate()
    } catch (error) {
      console.error('Error updating portfolio:', error)
      alert('Failed to update portfolio. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Portfolio Header */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="teacher-gradient p-8 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-3 rounded-full">
                <AcademicCapIcon className="h-12 w-12" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{portfolio.name}</h1>
                <p className="text-xl opacity-90">{portfolio.subject} Teacher</p>
                <div className="flex items-center mt-2">
                  {portfolio.verified ? (
                    <div className="flex items-center space-x-2">
                      <CheckBadgeIcon className="h-6 w-6 text-green-300" />
                      <span className="text-green-300 font-semibold">Verified</span>
                    </div>
                  ) : (
                    <span className="text-yellow-300">Pending Verification</span>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowUpdateForm(!showUpdateForm)}
              className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-colors"
            >
              <PencilIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <UserGroupIcon className="h-12 w-12 text-blue-500 mx-auto mb-3" />
              <div className="text-3xl font-bold text-blue-600">{portfolio.students_taught}</div>
              <div className="text-sm text-gray-600 mt-1">Students Taught</div>
            </div>

            <div className="text-center p-6 bg-green-50 rounded-lg">
              <CalendarIcon className="h-12 w-12 text-green-500 mx-auto mb-3" />
              <div className="text-3xl font-bold text-green-600">{portfolio.years_experience}</div>
              <div className="text-sm text-gray-600 mt-1">Years Experience</div>
            </div>

            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <ChartBarIcon className="h-12 w-12 text-purple-500 mx-auto mb-3" />
              <div className="text-3xl font-bold text-purple-600">{portfolio.impact_score}</div>
              <div className="text-sm text-gray-600 mt-1">Impact Score</div>
            </div>

            <div className="text-center p-6 bg-yellow-50 rounded-lg">
              <CheckBadgeIcon className="h-12 w-12 text-yellow-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-yellow-600">
                {portfolio.verified ? 'VERIFIED' : 'PENDING'}
              </div>
              <div className="text-sm text-gray-600 mt-1">Status</div>
            </div>
          </div>
        </div>
      </div>

      {/* Update Form */}
      {showUpdateForm && (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Update Your Stats</h3>
          <form onSubmit={handleUpdate} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Students Taught
                </label>
                <input
                  type="number"
                  min="0"
                  value={updateData.additionalStudents}
                  onChange={(e) => setUpdateData({
                    ...updateData,
                    additionalStudents: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teacher-green"
                  placeholder="Number of new students"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Years Experience
                </label>
                <input
                  type="number"
                  min="0"
                  value={updateData.additionalYears}
                  onChange={(e) => setUpdateData({
                    ...updateData,
                    additionalYears: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teacher-green"
                  placeholder="Additional years"
                />
              </div>
            </div>

            {(updateData.additionalStudents || updateData.additionalYears) && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">New Stats Preview</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-blue-600">
                      {portfolio.students_taught + (parseInt(updateData.additionalStudents) || 0)}
                    </div>
                    <div className="text-xs text-gray-600">Total Students</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-blue-600">
                      {portfolio.years_experience + (parseInt(updateData.additionalYears) || 0)}
                    </div>
                    <div className="text-xs text-gray-600">Total Years</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-blue-600">
                      {(portfolio.students_taught + (parseInt(updateData.additionalStudents) || 0)) * 
                       (portfolio.years_experience + (parseInt(updateData.additionalYears) || 0))}
                    </div>
                    <div className="text-xs text-gray-600">New Impact Score</div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-teacher-green text-white py-2 px-4 rounded-md hover:bg-teacher-green/90 focus:outline-none focus:ring-2 focus:ring-teacher-green disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Updating...' : 'Update Stats'}
              </button>
              <button
                type="button"
                onClick={() => setShowUpdateForm(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Metadata Link */}
      {portfolio.metadata_uri && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">NFT Metadata</h3>
          <a
            href={portfolio.metadata_uri}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800"
          >
            <span>View on IPFS</span>
            <ExternalLinkIcon className="h-4 w-4" />
          </a>
        </div>
      )}

      {/* Achievement Timeline */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Achievement Timeline</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
            <div className="bg-green-500 p-2 rounded-full">
              <AcademicCapIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="font-semibold text-green-800">Portfolio Created</div>
              <div className="text-sm text-gray-600">
                Started teaching journey documentation
              </div>
            </div>
          </div>

          {portfolio.verified && (
            <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
              <div className="bg-blue-500 p-2 rounded-full">
                <CheckBadgeIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="font-semibold text-blue-800">Portfolio Verified</div>
                <div className="text-sm text-gray-600">
                  Credentials verified by institution
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg">
            <div className="bg-purple-500 p-2 rounded-full">
              <ChartBarIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="font-semibold text-purple-800">Impact Score: {portfolio.impact_score}</div>
              <div className="text-sm text-gray-600">
                Current teaching impact measurement
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
