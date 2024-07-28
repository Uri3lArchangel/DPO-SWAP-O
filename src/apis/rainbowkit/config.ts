import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
} from '@rainbow-me/rainbowkit';
import {
  arbitrum,
} from 'wagmi/chains';



export const walletConfig = getDefaultConfig({
  appName: 'DPO DEX',
  projectId: "526dc409e476e8eea852880cb61873ae",
  chains: [arbitrum],
  ssr: true, // If your dApp uses server side rendering (SSR)
});