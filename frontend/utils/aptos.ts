import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk'

// Configure Aptos client for devnet
const config = new AptosConfig({ network: Network.DEVNET })
const aptos = new Aptos(config)

// Contract configuration
export const CONTRACT_ADDRESS = '0x174f07bcfca5b3b406fe11a48b8b20832809fcf60337c1fd7de80344bc6e8cdd'
export const MODULE_NAME = 'teacher_portfolio'

// IPFS configuration (you can use Pinata, web3.storage, or any IPFS service)
const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY || 'your-pinata-api-key'
const PINATA_SECRET_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_KEY || 'your-pinata-secret-key'

/**
 * Upload data to IPFS using Pinata
 */
export async function uploadToIPFS(data: string | File, contentType?: string): Promise<string> {
  try {
    const formData = new FormData()
    
    if (typeof data === 'string') {
      // Upload JSON metadata
      const blob = new Blob([data], { type: contentType || 'application/json' })
      formData.append('file', blob, 'metadata.json')
    } else {
      // Upload file
      formData.append('file', data)
    }

    const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        'pinata_api_key': PINATA_API_KEY,
        'pinata_secret_api_key': PINATA_SECRET_KEY,
      },
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Failed to upload to IPFS')
    }

    const result = await response.json()
    return `ipfs://${result.IpfsHash}`
  } catch (error) {
    console.error('IPFS upload error:', error)
    // Fallback: return a placeholder IPFS URI for demo purposes
    return 'ipfs://QmYourHashHere'
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
