# Teacher Portfolio DApp Frontend

A Next.js frontend for the Teacher Portfolio DApp built on Aptos blockchain.

## Features

- 🎓 **NFT Portfolio Creation**: Mint teaching portfolios as NFTs
- 📊 **Impact Tracking**: Track students taught and years of experience
- 🔗 **Wallet Integration**: Connect with Petra and Martian wallets
- 📁 **IPFS Storage**: Store metadata on IPFS via Pinata
- ✅ **Verification System**: Portfolio verification badges
- 📱 **Responsive Design**: Mobile-friendly interface

## Quick Start

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Environment Setup
```bash
# Copy environment template
cp env.example .env.local

# Edit .env.local with your Pinata credentials
NEXT_PUBLIC_PINATA_API_KEY=your_pinata_api_key
NEXT_PUBLIC_PINATA_SECRET_KEY=your_pinata_secret_key
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
frontend/
├── app/                    # Next.js 13+ App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── WalletProvider.tsx # Aptos wallet provider
│   ├── MintNFTForm.tsx    # NFT minting form
│   └── PortfolioDisplay.tsx # Portfolio viewer
├── utils/                 # Utility functions
│   └── aptos.ts          # Aptos SDK functions
└── package.json          # Dependencies
```

## Key Components

### WalletProvider
- Configures Aptos wallet adapter
- Supports Petra and Martian wallets
- Connects to devnet by default

### MintNFTForm
- Form for creating teacher portfolios
- Uploads metadata to IPFS
- Mints NFT on Aptos blockchain
- Progress tracking UI

### PortfolioDisplay
- Shows existing portfolio data
- Update statistics functionality
- Achievement timeline
- Verification status

## Smart Contract Integration

The frontend interacts with the Teacher Portfolio smart contract:

- **Contract Address**: `0x174f07bcfca5b3b406fe11a48b8b20832809fcf60337c1fd7de80344bc6e8cdd`
- **Module**: `teacher_portfolio`
- **Network**: Aptos Devnet

### Functions Used:
- `mint_portfolio_nft()` - Create new portfolio
- `update_impact_stats()` - Update teaching stats
- `verify_portfolio()` - Verify portfolio (admin)

## IPFS Integration

Uses Pinata for IPFS storage:

1. **Metadata Storage**: Portfolio metadata as JSON
2. **Image Storage**: Profile pictures
3. **Decentralized**: Content stored on IPFS network

### Metadata Structure:
```json
{
  "name": "Teacher Name",
  "description": "Teaching Portfolio for Teacher Name",
  "image": "ipfs://...",
  "attributes": [
    {"trait_type": "Subject", "value": "Mathematics"},
    {"trait_type": "Students Taught", "value": 150},
    {"trait_type": "Years Experience", "value": 5},
    {"trait_type": "Impact Score", "value": 750}
  ],
  "properties": {
    "bio": "Teaching philosophy...",
    "achievements": "Awards and recognitions...",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

## Usage Flow

1. **Connect Wallet**: User connects Petra/Martian wallet
2. **Create Portfolio**: Fill form with teaching details
3. **Upload to IPFS**: Metadata and images stored on IPFS
4. **Mint NFT**: Portfolio NFT created on Aptos
5. **View Portfolio**: Display portfolio with stats
6. **Update Stats**: Add new students/experience
7. **Get Verified**: Admin can verify portfolios

## Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Custom Colors**: Teacher-themed color palette
- **Responsive**: Mobile-first design
- **Animations**: Smooth transitions and loading states

## Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel
```

### Netlify
```bash
npm run build
# Deploy to Netlify
```

## Environment Variables

```env
# Required for IPFS uploads
NEXT_PUBLIC_PINATA_API_KEY=your_pinata_api_key
NEXT_PUBLIC_PINATA_SECRET_KEY=your_pinata_secret_key

# Optional (defaults provided)
NEXT_PUBLIC_APTOS_NETWORK=devnet
NEXT_PUBLIC_CONTRACT_ADDRESS=0x174f07bcfca5b3b406fe11a48b8b20832809fcf60337c1fd7de80344bc6e8cdd
```

## Getting Pinata Credentials

1. Sign up at [Pinata.cloud](https://pinata.cloud)
2. Go to API Keys section
3. Create new API key with pinning permissions
4. Copy API Key and Secret Key to `.env.local`

## Troubleshooting

### Common Issues:

1. **Wallet Connection**: Make sure Petra/Martian is installed
2. **Transaction Fails**: Check wallet has APT for gas fees
3. **IPFS Upload**: Verify Pinata credentials
4. **Contract Errors**: Ensure contract is deployed on devnet

### Debug Mode:
```bash
# Enable debug logging
NEXT_PUBLIC_DEBUG=true npm run dev
```

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## License

MIT License - see LICENSE file for details
