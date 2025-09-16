#!/bin/bash

# Teacher Portfolio DApp Deployment Script
# Usage: ./scripts/deploy.sh [devnet|testnet|mainnet]

set -e

NETWORK=${1:-devnet}
CONTRACT_ADDRESS="0x11f5ce7a69fcf922bb570a4c9ff0d7bb8c604cbadf1cb5385dc35cd98c814d00"

echo "🚀 Deploying Teacher Portfolio DApp to $NETWORK..."

# Step 1: Compile the contract
echo "📦 Compiling Move contract..."
aptos move compile

# Step 2: Run tests
echo "🧪 Running tests..."
aptos move test

# Step 3: Deploy to specified network
echo "🌐 Deploying to $NETWORK..."
case $NETWORK in
    "devnet")
        aptos move publish --url https://fullnode.devnet.aptoslabs.com --assume-yes --max-gas 100000
        ;;
    "testnet")
        aptos move publish --url https://fullnode.testnet.aptoslabs.com --assume-yes --max-gas 100000
        ;;
    "mainnet")
        aptos move publish --url https://fullnode.mainnet.aptoslabs.com --assume-yes --max-gas 100000
        ;;
    *)
        echo "❌ Unsupported network: $NETWORK"
        echo "Supported networks: devnet, testnet, mainnet"
        exit 1
        ;;
esac

# Step 4: Verify deployment
echo "✅ Verifying deployment..."
case $NETWORK in
    "devnet")
        aptos account list --query modules --account-address $CONTRACT_ADDRESS --url https://fullnode.devnet.aptoslabs.com
        ;;
    "testnet")
        aptos account list --query modules --account-address $CONTRACT_ADDRESS --url https://fullnode.testnet.aptoslabs.com
        ;;
    "mainnet")
        aptos account list --query modules --account-address $CONTRACT_ADDRESS --url https://fullnode.mainnet.aptoslabs.com
        ;;
esac

echo "🎉 Deployment completed successfully!"
echo "Contract Address: $CONTRACT_ADDRESS"
echo "Network: $NETWORK"
echo ""
echo "Next steps:"
echo "1. Test contract functions using the CLI commands in WORKFLOW.md"
echo "2. Integrate with frontend application"
echo "3. Monitor contract on Aptos Explorer"
