import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk'

// Configure Aptos client for devnet
const config = new AptosConfig({ network: Network.DEVNET })
const aptos = new Aptos(config)

// Contract configuration
export const CONTRACT_ADDRESS = '0x11f5ce7a69fcf922bb570a4c9ff0d7bb8c604cbadf1cb5385dc35cd98c814d00'
export const MODULE_NAME = 'teacher_portfolio'

// IPFS configuration using Pinata
const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY
const PINATA_SECRET_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_KEY
const PINATA_JWT = process.env.NEXT_PUBLIC_PINATA_JWT

/**
 * Upload data to IPFS using Pinata
 * Supports both API Key/Secret and JWT authentication
 */
export async function uploadToIPFS(data: string | File, contentType?: string): Promise<string> {
  try {
    // Check if we have the required credentials
    if (!PINATA_JWT && (!PINATA_API_KEY || !PINATA_SECRET_KEY)) {
      throw new Error('Pinata credentials not configured. Please set PINATA_JWT or PINATA_API_KEY/PINATA_SECRET_KEY in your environment variables.')
    }

    const formData = new FormData()
    
    if (typeof data === 'string') {
      // Upload JSON metadata
      const blob = new Blob([data], { type: contentType || 'application/json' })
      formData.append('file', blob, 'metadata.json')
    } else {
      // Upload file
      formData.append('file', data)
    }

    // Prepare headers based on available authentication method
    const headers: Record<string, string> = {}
    
    if (PINATA_JWT) {
      // Use JWT authentication (recommended)
      headers['Authorization'] = `Bearer ${PINATA_JWT}`
    } else {
      // Use API Key/Secret authentication
      headers['pinata_api_key'] = PINATA_API_KEY!
      headers['pinata_secret_api_key'] = PINATA_SECRET_KEY!
    }

    const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers,
      body: formData,
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Failed to upload to IPFS: ${response.status} ${errorText}`)
    }

    const result = await response.json()
    console.log('Successfully uploaded to IPFS:', result.IpfsHash)
    return `ipfs://${result.IpfsHash}`
    
  } catch (error) {
    console.error('IPFS upload error:', error)
    throw new Error(`IPFS upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/**
 * Mint a new teacher portfolio NFT
 */
export async function mintPortfolioNFT(
  signAndSubmitTransaction: any,
  name: string,
  subject: string,
  studentsTaught: number,
  yearsExperience: number,
  verified: boolean,
  metadataUri: string
) {
  const transaction = {
    data: {
      function: `${CONTRACT_ADDRESS}::${MODULE_NAME}::mint_portfolio_nft`,
      functionArguments: [
        name,
        subject,
        studentsTaught,
        yearsExperience,
        verified,
        metadataUri
      ],
    },
  }

  try {
    const response = await signAndSubmitTransaction(transaction)
    console.log('NFT minted successfully:', response)
    return response
  } catch (error) {
    console.error('Error minting NFT:', error)
    throw error
  }
}

/**
 * Update portfolio statistics
 */
export async function updatePortfolioStats(
  signAndSubmitTransaction: any,
  additionalStudents: number,
  additionalYears: number
) {
  const transaction = {
    data: {
      function: `${CONTRACT_ADDRESS}::${MODULE_NAME}::update_impact_stats`,
      functionArguments: [
        additionalStudents,
        additionalYears
      ],
    },
  }

  try {
    const response = await signAndSubmitTransaction(transaction)
    console.log('Portfolio updated successfully:', response)
    return response
  } catch (error) {
    console.error('Error updating portfolio:', error)
    throw error
  }
}

/**
 * Get teacher portfolio data
 */
export async function getPortfolio(accountAddress: string) {
  try {
    const resource = await aptos.getAccountResource({
      accountAddress,
      resourceType: `${CONTRACT_ADDRESS}::${MODULE_NAME}::TeacherPortfolioNFT`
    })
    
    return resource
  } catch (error) {
    console.error('Error fetching portfolio:', error)
    throw error
  }
}

/**
 * Verify a teacher's portfolio (admin function)
 */
export async function verifyPortfolio(
  signAndSubmitTransaction: any
) {
  const transaction = {
    data: {
      function: `${CONTRACT_ADDRESS}::${MODULE_NAME}::verify_portfolio`,
      functionArguments: [],
    },
  }

  try {
    const response = await signAndSubmitTransaction(transaction)
    console.log('Portfolio verified successfully:', response)
    return response
  } catch (error) {
    console.error('Error verifying portfolio:', error)
    throw error
  }
}

/**
 * Get account resources (for debugging)
 */
export async function getAccountResources(accountAddress: string) {
  try {
    const resources = await aptos.getAccountResources({
      accountAddress
    })
    return resources
  } catch (error) {
    console.error('Error fetching account resources:', error)
    throw error
  }
}
