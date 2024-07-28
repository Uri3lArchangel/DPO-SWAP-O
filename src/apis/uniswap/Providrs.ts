import { ethers,Provider } from 'ethers'


// Provider Functions

export async function getProvider() {
 
  return (new ethers.JsonRpcProvider("https://arbitrum-one.public.blastapi.io"))
  
}
