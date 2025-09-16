# 🎓 Teacher Portfolio DApp

![Aptos](https://img.shields.io/badge/Aptos-000000?style=for-the-badge&logo=aptos&logoColor=white)
![Move](https://img.shields.io/badge/Move-4285F4?style=for-the-badge&logo=move&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 📋 Project Overview

### 1. 🏆 Title of the Project
**Teacher Portfolio DApp - NFT Showcasing Teaching Impact & Statistics on Aptos Blockchain**

### 2. 📖 Description of the Project
The Teacher Portfolio DApp is a revolutionary decentralized application built on the Aptos blockchain that empowers educators to create, manage, and showcase their professional achievements through NFT portfolios. This innovative platform allows teachers to mint unique Non-Fungible Tokens (NFTs) that serve as digital certificates representing their teaching experience, student impact, and career milestones.

**Key Features:**
- **NFT Portfolio Creation**: Teachers can mint personalized NFTs containing their professional information, teaching statistics, and achievements
- **Impact Tracking System**: Dynamic calculation of teaching impact scores based on students taught and years of experience
- **Verification Mechanism**: Institutional verification system for authentic credential validation
- **Decentralized Storage**: IPFS integration for secure, decentralized metadata storage
- **Professional Showcase**: Beautiful, responsive UI for displaying teaching portfolios
- **Blockchain Security**: Leverages Aptos blockchain for immutable, transparent record-keeping

### 3. 🚀 Vision of the Project
Our vision is to **transform the educational landscape by creating a decentralized, transparent, and verifiable ecosystem for teacher credentials and achievements**. We envision a future where:

- **Global Recognition**: Teachers can showcase their impact and credentials globally, transcending geographical boundaries
- **Trust & Transparency**: Educational institutions, students, and parents can easily verify teacher qualifications and track records
- **Professional Growth**: Educators are incentivized to continuously improve and document their teaching journey
- **Decentralized Education**: Moving towards a blockchain-based education system that values and rewards quality teaching
- **Community Building**: Creating a global network of verified educators sharing best practices and achievements
- **Career Mobility**: Enabling teachers to seamlessly transition between institutions with portable, verifiable credentials

### 4. 🔮 Future Scope of the Project

#### **Phase 1: Enhanced Features (Q1-Q2 2024)**
- **Multi-Chain Support**: Expand to Ethereum, Polygon, and other major blockchains
- **Advanced Analytics**: Detailed teaching performance metrics and trend analysis
- **Student Feedback Integration**: Anonymous student reviews and ratings system
- **Achievement Badges**: Specialized NFT badges for specific accomplishments (e.g., "Innovation in Teaching", "Student Mentor")

#### **Phase 2: Ecosystem Expansion (Q3-Q4 2024)**
- **Institutional Dashboard**: Administrative panels for schools and universities
- **Teacher Marketplace**: Platform for connecting verified teachers with educational institutions
- **Continuing Education Tracking**: Integration with professional development programs
- **Peer Review System**: Teacher-to-teacher endorsements and recommendations

#### **Phase 3: Advanced Integration (2025)**
- **AI-Powered Insights**: Machine learning algorithms for personalized career recommendations
- **Cross-Platform Integration**: APIs for integration with existing educational management systems
- **Mobile Application**: Native iOS and Android apps for on-the-go portfolio management
- **Virtual Reality Showcases**: 3D/VR portfolio presentations for immersive experiences

#### **Phase 4: Global Adoption (2025-2026)**
- **Government Integration**: Partnerships with education ministries for official credential recognition
- **International Standards**: Compliance with global education credential frameworks
- **Scholarship Integration**: Connect high-impact teachers with funding opportunities
- **Research Platform**: Data analytics for educational research and policy development

#### **Long-term Vision (2026+)**
- **Decentralized Education DAO**: Community-governed platform for educational decision-making
- **Token Economy**: Native token rewards for exceptional teaching performance
- **Global Teacher Exchange**: Facilitating international teacher exchange programs
- **Educational Metaverse**: Virtual classrooms and teaching environments

## 🌟 Current Implementation

The Teacher Portfolio DApp revolutionizes how educators showcase their professional achievements by leveraging blockchain technology. Teachers can mint NFTs that represent their teaching portfolios, complete with verifiable statistics, achievements, and impact metrics.

### Key Features

- 🏆 **NFT Portfolio Creation**: Mint unique NFTs representing teaching portfolios
- 📊 **Impact Tracking**: Calculate and display teaching impact scores
- ✅ **Verification System**: Institutional verification of teacher credentials  
- 📈 **Dynamic Updates**: Update teaching stats and recalculate impact scores
- 🔗 **IPFS Integration**: Decentralized metadata storage
- 💼 **Professional Showcase**: Beautiful UI for displaying achievements
- 🔐 **Wallet Integration**: Support for Petra and Martian wallets

## 🏗️ Architecture

### Smart Contract (Move)
- **Module**: `MyModule::teacher_portfolio`
- **Address**: `0x11f5ce7a69fcf922bb570a4c9ff0d7bb8c604cbadf1cb5385dc35cd98c814d00`
- **Network**: Aptos Devnet/Testnet/Mainnet

### Frontend (Next.js)
- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom teacher theme
- **Wallet**: Aptos Wallet Adapter
- **Storage**: IPFS for metadata

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Aptos CLI](https://aptos.dev/tools/aptos-cli-tool/install-aptos-cli/)
- [Git](https://git-scm.com/)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/Teacher-Portfolio-DApp.git
cd Teacher-Portfolio-DApp
```

### 2. Smart Contract Setup

#### Install Aptos CLI
```bash
# Install Aptos CLI
curl -fsSL "https://aptos.dev/scripts/install_cli.py" | python3

# Initialize Aptos account (if not done)
aptos init

# Verify installation
aptos --version
```

#### Compile and Test Contract
```bash
# Compile the Move contract
aptos move compile

# Run tests
aptos move test
```

#### Deploy Contract
```bash
# Deploy to devnet
./scripts/deploy.sh devnet

# Deploy to testnet
./scripts/deploy.sh testnet

# Deploy to mainnet (production)
./scripts/deploy.sh mainnet
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the `frontend` directory:

```env
NEXT_PUBLIC_APTOS_NETWORK=devnet
NEXT_PUBLIC_CONTRACT_ADDRESS=0x11f5ce7a69fcf922bb570a4c9ff0d7bb8c604cbadf1cb5385dc35cd98c814d00
NEXT_PUBLIC_DAPP_NAME=Teacher Portfolio DApp
```

### Network Configuration

The DApp supports multiple Aptos networks:

- **Devnet**: For development and testing
- **Testnet**: For staging and pre-production
- **Mainnet**: For production deployment

## 📱 Usage

### For Teachers

1. **Connect Wallet**
   - Install Petra or Martian wallet
   - Connect wallet to the DApp
   - Ensure you have APT tokens for gas fees

2. **Create Portfolio NFT**
   - Fill in your teaching details (name, subject, experience)
   - Add profile image and bio
   - List key achievements
   - Mint your portfolio NFT

3. **Update Statistics**
   - Add new students taught
   - Update years of experience
   - Impact score automatically recalculates

4. **Portfolio Verification**
   - Submit for institutional verification
   - Verified portfolios display special badges

### For Institutions

1. **Verify Teachers**
   - Review teacher portfolio submissions
   - Verify credentials and achievements
   - Mark portfolios as verified

2. **Track Performance**
   - Monitor teaching statistics across faculty
   - Use impact scores for performance evaluation

## 🛠️ Smart Contract Functions

### Core Functions

#### `mint_portfolio_nft`
Creates a new teacher portfolio NFT.

```move
public entry fun mint_portfolio_nft(
    owner: &signer,
    name: String,
    subject: String,
    students_taught: u64,
    years_experience: u64,
    verified: bool,
    metadata_uri: String
)
```

#### `update_impact_stats`
Updates teaching statistics and recalculates impact score.

```move
public entry fun update_impact_stats(
    teacher: &signer,
    additional_students: u64,
    additional_years: u64
)
```

#### `verify_portfolio`
Marks a teacher's portfolio as verified.

```move
public entry fun verify_portfolio(
    teacher: &signer
)
```

### CLI Usage Examples

```bash
# Create a new portfolio
aptos move run \
  --function-id 0x11f5ce7a69fcf922bb570a4c9ff0d7bb8c604cbadf1cb5385dc35cd98c814d00::teacher_portfolio::mint_portfolio_nft \
  --args string:"John Smith" string:"Mathematics" u64:150 u64:5 bool:false string:"ipfs://QmYourMetadataHash" \
  --network devnet

# Update teaching stats
aptos move run \
  --function-id 0x11f5ce7a69fcf922bb570a4c9ff0d7bb8c604cbadf1cb5385dc35cd98c814d00::teacher_portfolio::update_impact_stats \
  --args u64:25 u64:1 \
  --network devnet

# Verify portfolio
aptos move run \
  --function-id 0x11f5ce7a69fcf922bb570a4c9ff0d7bb8c604cbadf1cb5385dc35cd98c814d00::teacher_portfolio::verify_portfolio \
  --network devnet
```

## 📊 Portfolio Structure

### NFT Attributes

Each teacher portfolio NFT contains:

```json
{
  "name": "Teacher Name",
  "description": "Teaching Portfolio for [Name]",
  "image": "ipfs://QmImageHash",
  "attributes": [
    {
      "trait_type": "Subject",
      "value": "Mathematics"
    },
    {
      "trait_type": "Students Taught",
      "value": 150
    },
    {
      "trait_type": "Years Experience",
      "value": 5
    },
    {
      "trait_type": "Impact Score",
      "value": 750
    },
    {
      "trait_type": "Verified",
      "value": true
    }
  ],
  "properties": {
    "bio": "Teaching philosophy and approach",
    "achievements": ["Award 1", "Award 2"],
    "education": "Educational background",
    "specializations": ["Algebra", "Geometry"]
  }
}
```

### Impact Score Calculation

The impact score is calculated as:
```
Impact Score = Students Taught × Years Experience
```

This provides a simple but meaningful metric for teaching impact.

## 🧪 Testing

### Smart Contract Tests

```bash
# Run all tests
aptos move test

# Run specific test
aptos move test --filter test_mint_portfolio

# Run tests with coverage
aptos move test --coverage
```

### Frontend Tests

```bash
cd frontend

# Run unit tests
npm test

# Run integration tests
npm run test:integration

# Run e2e tests
npm run test:e2e
```

## 📦 Deployment

### Smart Contract Deployment

1. **Compile Contract**
   ```bash
   aptos move compile
   ```

2. **Deploy to Network**
   ```bash
   # Devnet
   aptos move publish --network devnet

   # Testnet
   aptos move publish --network testnet

   # Mainnet
   aptos move publish --network mainnet
   ```

3. **Verify Deployment**
   ```bash
   aptos account list --query modules --account-address YOUR_ADDRESS
   ```

### Frontend Deployment

#### Vercel (Recommended)

1. **Connect Repository**
   - Import project to Vercel
   - Configure build settings

2. **Environment Variables**
   - Set production environment variables
   - Configure network endpoints

3. **Deploy**
   ```bash
   npm run build
   vercel --prod
   ```

#### Manual Deployment

```bash
cd frontend

# Build production version
npm run build

# Start production server
npm start
```

## 🔒 Security Considerations

### Smart Contract Security

- ✅ Input validation on all functions
- ✅ Access control (only portfolio owner can update)
- ✅ Error handling with descriptive messages
- ✅ Prevents duplicate portfolio creation
- ✅ Safe arithmetic operations

### Frontend Security

- ✅ Secure wallet integration
- ✅ Input sanitization
- ✅ HTTPS deployment
- ✅ Environment variable protection

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

### Code Style

- Follow Move best practices for smart contracts
- Use TypeScript for frontend development
- Follow Tailwind CSS conventions
- Write comprehensive tests

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Aptos Labs](https://aptoslabs.com/) for the blockchain infrastructure
- [Move Language](https://move-language.github.io/move/) for smart contract development
- [Next.js](https://nextjs.org/) for the frontend framework
- [Tailwind CSS](https://tailwindcss.com/) for styling

## 🔗 Links

- **Live Demo**: [https://teacher-portfolio-dapp.vercel.app](https://teacher-portfolio-dapp.vercel.app)
- **Aptos Explorer**: [View Contract](https://explorer.aptoslabs.com/account/0x11f5ce7a69fcf922bb570a4c9ff0d7bb8c604cbadf1cb5385dc35cd98c814d00?network=devnet)
- **Deployment Transaction**: [View Transaction](https://explorer.aptoslabs.com/txn/164317995?network=devnet)
<img width="1811" height="870" alt="image" src="https://github.com/user-attachments/assets/41311aa3-79fb-4d4e-9583-51aaca094931" />

- **Portfolio Update Proof**: [View Update Transaction](https://explorer.aptoslabs.com/txn/0xcdb67b08e598da74e14209818997d5f7d7baabb9cea774e8f46bf85a1dec8117?network=devnet)
- **Documentation**: [Project Wiki](https://github.com/yourusername/Teacher-Portfolio-DApp/wiki)

## 📞 Support

- **Discord**: [Join our community](https://discord.gg/aptos)
- **Issues**: [GitHub Issues](https://github.com/yourusername/Teacher-Portfolio-DApp/issues)
- **Email**: support@teacherportfolio.com

## 🎯 ISTE x Build on Aptos Bootcamp

This project was developed as part of the **ISTE x Build on Aptos Bootcamp** - a hands-on Web3 development program focused on building decentralized applications in the Aptos ecosystem.

### 🚀 Event Details

**ISTE x Build on Aptos Bootcamp**
- 📅 **Date**: 15th - 16th September, 2025
- 📍 **Venue**: SRM-IST, Delhi NCR Campus (Ghaziabad)
- 🌐 **Website**: [istesrmncr.in](https://istesrmncr.in)

### ✨ What the Bootcamp Offered

- ⚡ Hands-on training to build dApps in the Aptos ecosystem
- ⚡ Expert mentors, real projects, fullstack skills
- ⚡ Cool goodies, refreshments & certificates 🏅
- ⚡ Win $25 for a fullstack project 💰

### 👨‍💻 Developer Information

**Developer**: Adit Jain  
**Registration No**: RA2311026030176  
**Program**: B.Tech CSE - AIML, 5th Semester  
**Institution**: SRM Institute of Science and Technology

### 📞 Event Contacts

For bootcamp queries:
- **Akash Deep**: 8826036898
- **Sneha Tripathy**: 9348590847

---

**Built with ❤️ for educators worldwide during the ISTE x Build on Aptos Bootcamp 🚀**
