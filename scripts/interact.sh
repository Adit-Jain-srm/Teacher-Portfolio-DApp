#!/bin/bash

# Teacher Portfolio DApp Interaction Script
# Usage: ./scripts/interact.sh [function_name] [args...]

set -e

NETWORK=${APTOS_NETWORK:-devnet}
CONTRACT_ADDRESS="0x174f07bcfca5b3b406fe11a48b8b20832809fcf60337c1fd7de80344bc6e8cdd"
MODULE_NAME="teacher_portfolio"

# Function to get network URL
get_network_url() {
    case $1 in
        "devnet")
            echo "https://fullnode.devnet.aptoslabs.com"
            ;;
        "testnet")
            echo "https://fullnode.testnet.aptoslabs.com"
            ;;
        "mainnet")
            echo "https://fullnode.mainnet.aptoslabs.com"
            ;;
        *)
            echo "❌ Unsupported network: $1"
            exit 1
            ;;
    esac
}

case "$1" in
    "create")
        echo 
        "🎓 Creating teacher portfolio..."
        if [ $# -ne 5 ]; then
            echo "Usage: $0 create <name> <subject> <initial_students> <years_exp>"
            echo "Example: $0 create \"John Smith\" \"Mathematics\" 150 5"
            exit 1
        fi
        URL=$(get_network_url $NETWORK)
        aptos move run \
            --function-id ${CONTRACT_ADDRESS}::${MODULE_NAME}::create_portfolio \
            --args string:"$2" string:"$3" u64:$4 u64:$5 \
            --url $URL --assume-yes --max-gas 10000
        echo "✅ Portfolio created successfully!"
        ;;
    
    "update")
        echo "📊 Updating impact stats..."
        if [ $# -ne 4 ]; then
            echo "Usage: $0 update <additional_students> <additional_years> <achievement_points>"
            echo "Example: $0 update 25 1 100"
            exit 1
        fi
        URL=$(get_network_url $NETWORK)
        aptos move run \
            --function-id ${CONTRACT_ADDRESS}::${MODULE_NAME}::update_impact_stats \
            --args u64:$2 u64:$3 u64:$4 \
            --url $URL --assume-yes --max-gas 10000
        echo "✅ Stats updated successfully!"
        ;;
    
    "view")
        echo "👀 Viewing teacher portfolio..."
        if [ $# -ne 2 ]; then
            echo "Usage: $0 view <teacher_address>"
            echo "Example: $0 view 0x1234..."
            exit 1
        fi
        URL=$(get_network_url $NETWORK)
        aptos account list --query resources --account-address $2 --url $URL
        ;;
    
    "examples")
        echo "📚 Example interactions:"
        echo ""
        echo "1. Create a portfolio:"
        echo "   $0 create \"Alice Johnson\" \"Physics\" 200 8"
        echo ""
        echo "2. Update stats:"
        echo "   $0 update 30 1 150"
        echo ""
        echo "3. View portfolio:"
        echo "   $0 view 0x1234567890abcdef..."
        echo ""
        ;;
    
    *)
        echo "Teacher Portfolio DApp Interaction Tool"
        echo ""
        echo "Usage: $0 [command] [args...]"
        echo ""
        echo "Commands:"
        echo "  create    Create a new teacher portfolio"
        echo "  update    Update teacher's impact statistics"
        echo "  view      View a teacher's portfolio"
        echo "  examples  Show usage examples"
        echo ""
        echo "Environment Variables:"
        echo "  APTOS_NETWORK    Network to use (default: devnet)"
        echo ""
        exit 1
        ;;
esac
