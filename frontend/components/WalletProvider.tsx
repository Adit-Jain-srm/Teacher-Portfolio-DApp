'use client'

import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react'
import { PetraWallet } from '@aptos-labs/wallet-adapter-petra'
import { MartianWallet } from '@aptos-labs/wallet-adapter-martian'
import { Network } from '@aptos-labs/ts-sdk'

const wallets = [
  new PetraWallet(),
  new MartianWallet(),
]

export function WalletProvider({ children }: { children: React.ReactNode }) {
  return (
    <AptosWalletAdapterProvider
      plugins={wallets}
      autoConnect={true}
      dappConfig={{
        network: Network.DEVNET,
        aptosConnectDappId: 'teacher-portfolio-dapp',
      }}
    >
      {children}
    </AptosWalletAdapterProvider>
  )
}
