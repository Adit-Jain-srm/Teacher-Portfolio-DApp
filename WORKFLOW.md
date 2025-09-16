# Teacher Portfolio DApp Workflow

## Project Overview
A decentralized application on Aptos blockchain that allows teachers to create and manage NFT portfolios showcasing their teaching impact and statistics.

## Smart Contract Architecture

### Core Components
- **Module**: `MyModule::teacher_portfolio`
- **Address**: `0x174f07bcfca5b3b406fe11a48b8b20832809fcf60337c1fd7de80344bc6e8cdd`
- **Main Struct**: `TeacherNFT` - Stores teacher's portfolio data

### Key Functions
1. `create_portfolio()` - Mint initial teacher portfolio NFT
2. `update_impact_stats()` - Update teaching achievements and stats

## Development Workflow

### 1. Prerequisites Setup
```bash
# Install Aptos CLI
curl -fsSL "https://aptos.dev/scripts/install_cli.py" | python3

# Initialize Aptos account (if not done)
aptos init

# Verify installation
aptos --version
```

### 2. Smart Contract Development

#### Compile Contract
```bash
# Navigate to project directory
cd "C:\Users\aditj\New Projects\Aptos Teacher Portfolio DApp – NFT showcasing impactstats"

# Compile the Move contract
aptos move compile
```

#### Test Contract
```bash
# Run unit tests
aptos move test

# Run specific test
aptos move test --filter test_create_portfolio
```

### 3. Deployment Process

#### Deploy to Testnet
```bash
# Deploy to Aptos testnet
aptos move publish --network testnet

# Verify deployment
aptos account list --query modules --account-address 0x174f07bcfca5b3b406fe11a48b8b20832809fcf60337c1fd7de80344bc6e8cdd
```

#### Deploy to Mainnet
```bash
# Deploy to Aptos mainnet (when ready)
aptos move publish --network mainnet
```

### 4. Contract Interaction

#### Create Teacher Portfolio
```bash
# Example: Create a new teacher portfolio
aptos move run \
  --function-id 0x174f07bcfca5b3b406fe11a48b8b20832809fcf60337c1fd7de80344bc6e8cdd::teacher_portfolio::create_portfolio \
  --args string:"John Smith" string:"Mathematics" u64:150 u64:5 \
  --network testnet
```

#### Update Impact Stats
```bash
# Example: Update teacher's impact statistics
aptos move run \
  --function-id 0x174f07bcfca5b3b406fe11a48b8b20832809fcf60337c1fd7de80344bc6e8cdd::teacher_portfolio::update_impact_stats \
  --args u64:25 u64:1 u64:100 \
  --network testnet
```

### 5. Frontend Integration Workflow

#### Setup React/Next.js Frontend
```bash
# Create frontend application
npx create-next-app@latest teacher-portfolio-frontend
cd teacher-portfolio-frontend

# Install Aptos SDK
npm install @aptos-labs/ts-sdk
npm install @aptos-labs/wallet-adapter-react
```

#### Key Frontend Components
1. **WalletConnection** - Connect to Aptos wallets (Petra, Martian)
2. **CreatePortfolio** - Form to create teacher portfolio
3. **UpdateStats** - Interface to update teaching stats
4. **ViewPortfolio** - Display teacher's NFT portfolio
5. **Dashboard** - Overview of all teacher portfolios

### 6. Testing Strategy

#### Unit Tests
Create test files in `/tests` directory:
```move
// tests/teacher_portfolio_tests.move
#[test_only]
module MyModule::teacher_portfolio_tests {
    use MyModule::teacher_portfolio;
    // Test functions here
}
```

#### Integration Tests
- Test wallet connectivity
- Test contract function calls
- Test error handling
- Test UI components

### 7. Production Deployment

#### Smart Contract
1. Audit contract code
2. Deploy to mainnet
3. Verify contract on Aptos Explorer

#### Frontend Application
1. Build production version
2. Deploy to Vercel/Netlify
3. Configure environment variables
4. Test on mainnet

## Usage Examples

### For Teachers
1. **Connect Wallet**: Use Petra or Martian wallet
2. **Create Portfolio**: Fill in name, subject, initial stats
3. **Update Regularly**: Add new students, achievements
4. **Share Portfolio**: Use NFT as teaching credential

### For Institutions
1. **Verify Teachers**: Check portfolio authenticity
2. **Track Performance**: Monitor teaching statistics
3. **Recruitment**: Use portfolios for hiring decisions

## Monitoring and Maintenance

### Contract Monitoring
- Monitor transaction success rates
- Track gas usage
- Watch for error patterns

### Frontend Maintenance
- Update SDK dependencies
- Monitor wallet compatibility
- Optimize performance

## Security Considerations

### Smart Contract
- Input validation on all functions
- Access control (only portfolio owner can update)
- Error handling with descriptive messages

### Frontend
- Secure wallet integration
- Input sanitization
- HTTPS deployment

## Future Enhancements

### V2 Features
- Portfolio sharing and endorsements
- Achievement badges system
- Integration with educational platforms
- Multi-language support

### Advanced Analytics
- Teaching impact metrics
- Comparative statistics
- Performance trends

## Resources

- [Aptos Documentation](https://aptos.dev/)
- [Move Language Guide](https://move-language.github.io/move/)
- [Aptos SDK](https://github.com/aptos-labs/aptos-ts-sdk)
- [Wallet Adapter](https://github.com/aptos-labs/aptos-wallet-adapter)

## Support

For issues and questions:
- Check Aptos Discord community
- Review Move language documentation
- Test on Aptos testnet first
