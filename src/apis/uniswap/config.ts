import { ExampleConfig } from "@/declarations";
import { TokenObjectStructure } from "@/src/data/TokenData";
import { SUPPORTED_CHAINS, Token } from "@uniswap/sdk-core";
import { FeeAmount } from '@uniswap/v3-sdk'



export const tokenConfig = (inToken:TokenObjectStructure,outToken:TokenObjectStructure,amountIn:number,chain?:number)=>{
    let chainID =SUPPORTED_CHAINS[4]
    
    const TokenIn=new Token(
        chainID,inToken.address,inToken.decimals,inToken.symbol,inToken.name
    )
    const TokenOut=new Token(
        chainID,outToken.address,outToken.decimals,outToken.symbol,outToken.name
    )

 return {
  
    tokens: {
      in: TokenIn,
      amountIn: amountIn,
      out: TokenOut,
      poolFee: FeeAmount.HIGH,
    },

  } as ExampleConfig
}

