'use client'

import { useState, useEffect } from 'react'
import { useWallet } from '@aptos-labs/wallet-adapter-react'
import { WalletSelector } from '@aptos-labs/wallet-adapter-ant-design'
import { AcademicCapIcon, ChartBarIcon, UserGroupIcon, CheckBadgeIcon } from '@heroicons/react/24/outline'
import MintNFTForm from '@/components/MintNFTForm'
import PortfolioDisplay from '@/components/PortfolioDisplay'
import { getPortfolio } from '@/utils/aptos'

export default function Home() {
  const { connected, account } = useWallet()
  const [portfolio, setPortfolio] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (connected && account) {
      fetchPortfolio()
    }
  }, [connected, account])

  const fetchPortfolio = async () => {
    if (!account) return
    
    setLoading(true)
    try {
      const portfolioData = await getPortfolio(account.address)
      setPortfolio(portfolioData)
    } catch (error) {
      console.log('No portfolio found for this account')
      setPortfolio(null)
    } finally {
      setLoading(false)
    }
  }

  const onMintSuccess = () => {
    fetchPortfolio()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <AcademicCapIcon className="h-8 w-8 text-teacher-green" />
              <h1 className="text-2xl font-bold text-gray-900">
                Teacher Portfolio DApp
              </h1>
            </div>
            <WalletSelector />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!connected ? (
          /* Welcome Section */
          <div className="text-center">
            <div className="mx-auto max-w-md">
              <AcademicCapIcon className="mx-auto h-24 w-24 text-teacher-green mb-6" />
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Showcase Your Teaching Impact
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Create your professional teaching portfolio as an NFT on the Aptos blockchain. 
                Verify your experience and showcase your impact to the world.
              </p>
              
              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="text-center p-6 bg-white rounded-lg shadow-md">
                  <ChartBarIcon className="h-12 w-12 text-teacher-purple mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Track Impact</h3>
                  <p className="text-gray-600">Monitor your teaching statistics and student success rates</p>
                </div>
                
                <div className="text-center p-6 bg-white rounded-lg shadow-md">
                  <UserGroupIcon className="h-12 w-12 text-teacher-green mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Build Community</h3>
                  <p className="text-gray-600">Connect with other educators and share experiences</p>
                </div>
                
                <div className="text-center p-6 bg-white rounded-lg shadow-md">
                  <CheckBadgeIcon className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Get Verified</h3>
                  <p className="text-gray-600">Earn verification badges for your achievements</p>
                </div>
              </div>
              
              <div className="mt-12">
                <p className="text-lg text-gray-700 mb-4">
                  Connect your Aptos wallet to get started
                </p>
                <WalletSelector />
              </div>
            </div>
          </div>
        ) : (
          /* Connected User Content */
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Welcome, {account?.address.slice(0, 6)}...{account?.address.slice(-4)}
              </h2>
              <p className="text-gray-600">
                {portfolio ? 'Manage your teaching portfolio' : 'Create your first teaching portfolio NFT'}
              </p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teacher-green"></div>
                <p className="mt-4 text-gray-600">Loading portfolio...</p>
              </div>
            ) : portfolio ? (
              <PortfolioDisplay portfolio={portfolio} onUpdate={fetchPortfolio} />
            ) : (
              <MintNFTForm onSuccess={onMintSuccess} />
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600">
              Built on Aptos Blockchain • Teacher Portfolio DApp
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Empowering educators through blockchain technology
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
