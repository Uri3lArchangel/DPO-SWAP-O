
interface MyObject {
    [key: string]:TokenObjectStructure
}


export interface TokenObjectStructure {
    name:string,
    symbol: string,
    logo: string,
    address: string,
    decimals: number,
}


 
export const tokensData:MyObject= {   
  //  Ethereum: {
  //     symbol: "ETH",
  //     logo: "https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png",
  //     address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  //     decimals: 18,
  //     name:"Ethereum"
  //   },
    "Wrapped Ether": {
      symbol: "WETH",
      logo: "https://d23exngyjlavgo.cloudfront.net/0xa_0x4200000000000000000000000000000000000006",
      address: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
      decimals: 18,
      name:"Wrapped Ether"
    },
    "Direct Private Offers":{
        symbol:"DPO",
        logo:process.env.NODE_ENV == 'production'?"https://swap.dpo-global.com/assets/DPO-Imgur.png":"/DPO-Imgur.png",
        address:"0x73ea12A934a9A08614D165DB30F87BdfD1A2Cb92",
        decimals:18,
        name:"Direct Private Offers"
    },
    "Tether USD": {
      symbol: "USDT",
      logo: "https://tokens.1inch.io/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
      address: "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
      decimals: 6,
      name:"Tether USD"
    },
    "Dai Stablecoin": {
      symbol: "DAI",
      logo: "https://tokens.1inch.io/0x6b175474e89094c44da98b954eedeac495271d0f.png",
      address: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
      decimals: 18,
      name:'Dai Stablecoin'
    },
    "USD Coin": {
      symbol: "USDC",
      logo: "https://seeklogo.com/images/U/usd-coin-usdc-logo-CB4C5B1C51-seeklogo.com.png",
      address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      decimals: 6,
      name:"USD Coin"
    },
    "Uniswap": {
        symbol: "UNI",
        decimals: 18,
        address: "0xfa7f8980b0f1e64a2062791cc3b0871572f1f7f0",
        logo: "https://tokens.1inch.io/0x1f9840a85d5af5bf1d1762f925bdaddc4201f984.png",
        name:"Uniswap"
       
      },
      "Arbitrum": {
        symbol: "ARB",
        decimals: 18,
        address: "0x912ce59144191c1204e64559fe8253a0e49e6548",
        logo: "https://tokens.1inch.io/0x912ce59144191c1204e64559fe8253a0e49e6548.png",
        name:"Arbitrum"
  },
  "ChainLink Token": {
    symbol: "LINK",
    decimals: 18,
    address: "0xf97f4df75117a78c1a5a0dbb814af92458539fb4",
    logo: "https://tokens.1inch.io/0x514910771af9ca656af840dff83e8264ecf986ca.png",
    name:'ChainLink Token'
    
  },
  "SushiToken": {
    symbol: "SUSHI",
    decimals: 18,
    address: "0xd4d42f0b6def4ce0383636770ef773390d85c61a",
    logo: "https://tokens.1inch.io/0x6b3595068778dd592e39a122f4f5a5cf09c90fe2.png",
    name:"SushiToken"
    
  },
  "GMX": {
    symbol: "GMX",
    address: "0xfc5a1a6eb076a2c7ad06ed22c90d7e710e35ad0a",
    decimals: 18,
    logo: "https://tokens.1inch.io/0xfc5a1a6eb076a2c7ad06ed22c90d7e710e35ad0a.png",
    name:'GMX'
    
  },
  "VelaToken": {
    symbol: "VELA",
    decimals: 18,
    address: "0x088cd8f5ef3652623c22d48b1605dcfe860cd704",
    logo: "https://tokens.1inch.io/0x088cd8f5ef3652623c22d48b1605dcfe860cd704.png",
    name:"VelaToken"
   
  }
}



export const tokensDataArry:TokenObjectStructure[]= [
    //    {
    //     name:"Ethereum",
    //   symbol: "ETH",
    //   logo: "https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png",
    //   address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    //   decimals: 18,
    // },
     {
        name:"Wrapped Ether",
      symbol: "WETH",
      logo: "https://d23exngyjlavgo.cloudfront.net/0xa_0x4200000000000000000000000000000000000006",
      address: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
      decimals: 18,
    },
    {
        name:"Direct Private Offers",
        symbol:"DPO",
        logo:process.env.NODE_ENV == 'production'?"https://swap.dpo-global.com/assets/DPO-Imgur.png":"/DPO-Imgur.png",
        address:"0x73ea12A934a9A08614D165DB30F87BdfD1A2Cb92",
        decimals:18
    },
 {
    name:"Tether USD",
      symbol: "USDT",
      logo: "https://tokens.1inch.io/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
      address: "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
      decimals: 6,
    },
    {
        name:"Dai Stablecoin",
      symbol: "DAI",
      logo: "https://tokens.1inch.io/0x6b175474e89094c44da98b954eedeac495271d0f.png",
      address: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
      decimals: 18,
    },
    {
        name:"USD Coin",
      symbol: "USDC",
      logo: "https://seeklogo.com/images/U/usd-coin-usdc-logo-CB4C5B1C51-seeklogo.com.png",
      address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      decimals: 6,
    },
    {
        name: "Uniswap",
        symbol: "UNI",
        decimals: 18,
        address: "0xfa7f8980b0f1e64a2062791cc3b0871572f1f7f0",
        logo: "https://tokens.1inch.io/0x1f9840a85d5af5bf1d1762f925bdaddc4201f984.png",
       
      },
     {
        name:  "Arbitrum",
        symbol: "ARB",
        decimals: 18,
        address: "0x912ce59144191c1204e64559fe8253a0e49e6548",
        logo: "https://tokens.1inch.io/0x912ce59144191c1204e64559fe8253a0e49e6548.png",
  },
   {
    name:  "ChainLink Token",
    symbol: "LINK",
    decimals: 18,
    address: "0xf97f4df75117a78c1a5a0dbb814af92458539fb4",
    logo: "https://tokens.1inch.io/0x514910771af9ca656af840dff83e8264ecf986ca.png",
    
  },
   {
    name: "SushiToken",
    symbol: "SUSHI",
    decimals: 18,
    address: "0xd4d42f0b6def4ce0383636770ef773390d85c61a",
    logo: "https://tokens.1inch.io/0x6b3595068778dd592e39a122f4f5a5cf09c90fe2.png",
    
  },
   {
    name: "GMX",
    symbol: "GMX",
    address: "0xfc5a1a6eb076a2c7ad06ed22c90d7e710e35ad0a",
    decimals: 18,
    logo: "https://tokens.1inch.io/0xfc5a1a6eb076a2c7ad06ed22c90d7e710e35ad0a.png",
    
  },
   {
    name: "VelaToken",
    symbol: "VELA",
    decimals: 18,
    address: "0x088cd8f5ef3652623c22d48b1605dcfe860cd704",
    logo: "https://tokens.1inch.io/0x088cd8f5ef3652623c22d48b1605dcfe860cd704.png",
   
  
}]


export const commonCoins:TokenObjectStructure[]= [
//       {
//      name:"Ethereum",
//    symbol: "ETH",
//    logo: "https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png",
//    address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
//    decimals: 18,
//  },
  {
     name:"Wrapped Ether",
   symbol: "WETH",
   logo: "https://d23exngyjlavgo.cloudfront.net/0xa_0x4200000000000000000000000000000000000006",
   address: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
   decimals: 18,
 },
 {
     name:"Direct Private Offers",
     symbol:"DPO",
     logo:process.env.NODE_ENV == 'production'?"https://swap.dpo-global.com/assets/DPO-Imgur.png":"/DPO-Imgur.png",
     address:"0x73ea12A934a9A08614D165DB30F87BdfD1A2Cb92",
     decimals:18
 },
{
 name:"Tether USD",
   symbol: "USDT",
   logo: "https://tokens.1inch.io/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
   address: "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
   decimals: 6,
 },


 {
     name: "Uniswap",
     symbol: "UNI",
     decimals: 18,
     address: "0xfa7f8980b0f1e64a2062791cc3b0871572f1f7f0",
     logo: "https://tokens.1inch.io/0x1f9840a85d5af5bf1d1762f925bdaddc4201f984.png",
    
   },
  {
     name:  "Arbitrum",
     symbol: "ARB",
     decimals: 18,
     address: "0x912ce59144191c1204e64559fe8253a0e49e6548",
     logo: "https://tokens.1inch.io/0x912ce59144191c1204e64559fe8253a0e49e6548.png",
},


]
