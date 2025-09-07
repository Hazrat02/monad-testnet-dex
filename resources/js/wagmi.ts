// resources/js/wagmi.ts
import { http, createConfig } from '@wagmi/vue'
import { mainnet } from '@wagmi/vue/chains'
import { injected, metaMask, coinbaseWallet, walletConnect } from '@wagmi/vue/connectors'

// ⚠️ Replace with your own WalletConnect project ID
const projectId = '<WALLETCONNECT_PROJECT_ID>'

export const config = createConfig({
  chains: [mainnet],
  connectors: [
    injected({ shimDisconnect: true }), // covers Rainbow, Bitget, Brave, etc.
    metaMask(),
    coinbaseWallet({ appName: 'My Inertia DApp' }),
    walletConnect({ projectId }),
  ],
  transports: {
    [mainnet.id]: http(),
  },
})
