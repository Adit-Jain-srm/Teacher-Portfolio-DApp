'use client'

import { useState } from 'react'
import { useWallet } from '@aptos-labs/wallet-adapter-react'
import { AcademicCapIcon, PhotoIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { mintPortfolioNFT, uploadToIPFS } from '@/utils/aptos'

interface MintNFTFormProps {
  onSuccess: () => void
}

export default function MintNFTForm({ onSuccess }: MintNFTFormProps) {
  const { signAndSubmitTransaction } = useWallet()
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    studentsTaught: '',
    yearsExperience: '',
    achievements: '',
    bio: '',
    profileImage: null as File | null,
  })
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        profileImage: e.target.files[0],
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      setStep(2) // Uploading to IPFS
      
      // Create metadata object
      const metadata = {
        name: formData.name,
        description: `Teaching Portfolio for ${formData.name}`,
        image: formData.profileImage ? await uploadToIPFS(formData.profileImage) : '',
        attributes: [
          { trait_type: 'Subject', value: formData.subject },
          { trait_type: 'Students Taught', value: parseInt(formData.studentsTaught) },
          { trait_type: 'Years Experience', value: parseInt(formData.yearsExperience) },
          { trait_type: 'Impact Score', value: parseInt(formData.studentsTaught) * parseInt(formData.yearsExperience) },
        ],
        properties: {
          bio: formData.bio,
          achievements: formData.achievements,
          created_at: new Date().toISOString(),
        }
      }

      // Upload metadata to IPFS
      const metadataUri = await uploadToIPFS(JSON.stringify(metadata, null, 2), 'application/json')
      
      setStep(3) // Minting NFT
      
      // Mint NFT
      await mintPortfolioNFT(
        signAndSubmitTransaction,
        formData.name,
        formData.subject,
        parseInt(formData.studentsTaught),
        parseInt(formData.yearsExperience),
        false, // verified starts as false
        metadataUri
      )

      setStep(4) // Success
      setTimeout(() => {
        onSuccess()
      }, 2000)

    } catch (error) {
      console.error('Error minting NFT:', error)
      alert('Failed to mint NFT. Please try again.')
      setStep(1)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <div className="mb-8">
            {step === 2 && (
              <>
                <PhotoIcon className="h-16 w-16 text-blue-500 mx-auto mb-4 animate-pulse" />
                <h3 className="text-xl font-semibold mb-2">Uploading to IPFS...</h3>
                <p className="text-gray-600">Storing your portfolio metadata on IPFS</p>
              </>
            )}
            {step === 3 && (
              <>
                <AcademicCapIcon className="h-16 w-16 text-teacher-green mx-auto mb-4 animate-pulse" />
                <h3 className="text-xl font-semibold mb-2">Minting Your NFT...</h3>
                <p className="text-gray-600">Creating your portfolio NFT on Aptos blockchain</p>
              </>
            )}
            {step === 4 && (
              <>
                <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Success!</h3>
                <p className="text-gray-600">Your teaching portfolio NFT has been created</p>
              </>
            )}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-teacher-green h-2 rounded-full transition-all duration-500"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <AcademicCapIcon className="h-12 w-12 text-teacher-green mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Create Your Teaching Portfolio NFT
        </h2>
        <p className="text-gray-600">
          Showcase your teaching experience and impact on the blockchain
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teacher-green"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject/Field *
            </label>
            <input
              type="text"
              name="subject"
              required
              value={formData.subject}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teacher-green"
              placeholder="e.g., Mathematics, Science, English"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Students Taught *
            </label>
            <input
              type="number"
              name="studentsTaught"
              required
              min="0"
              value={formData.studentsTaught}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teacher-green"
              placeholder="Total number of students"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Years of Experience *
            </label>
            <input
              type="number"
              name="yearsExperience"
              required
              min="0"
              value={formData.yearsExperience}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teacher-green"
              placeholder="Years teaching"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profile Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teacher-green"
          />
          <p className="text-sm text-gray-500 mt-1">Upload a professional profile photo (optional)</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bio
          </label>
          <textarea
            name="bio"
            rows={3}
            value={formData.bio}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teacher-green"
            placeholder="Tell us about your teaching philosophy and approach..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Key Achievements
          </label>
          <textarea
            name="achievements"
            rows={3}
            value={formData.achievements}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teacher-green"
            placeholder="List your notable achievements, awards, or recognitions..."
          />
        </div>

        {formData.studentsTaught && formData.yearsExperience && (
          <div className="bg-teacher-green/10 p-4 rounded-lg">
            <h3 className="font-semibold text-teacher-green mb-2">Impact Score Preview</h3>
            <p className="text-2xl font-bold text-teacher-green">
              {parseInt(formData.studentsTaught) * parseInt(formData.yearsExperience)}
            </p>
            <p className="text-sm text-gray-600">
              Calculated as: Students Taught × Years Experience
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-teacher-green text-white py-3 px-4 rounded-md hover:bg-teacher-green/90 focus:outline-none focus:ring-2 focus:ring-teacher-green focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
        >
          {loading ? 'Creating NFT...' : 'Mint Portfolio NFT'}
        </button>
      </form>
    </div>
  )
}
