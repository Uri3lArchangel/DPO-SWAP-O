import { ethers } from 'ethers';
import { tokenConfig } from './config';
import { computePoolAddress } from '@uniswap/v3-sdk';
import Quoter from '@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json';
import IUniswapV3PoolABI from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json';
import { toReadableAmount, fromReadableAmount } from './conversions';
import { TokenObjectStructure } from '@/src/data/TokenData';
import { getProvider } from './Providrs';

export async function quote(inToken: TokenObjectStructure, outToken: TokenObjectStructure, amountIn: number, chain?: number): Promise<string> {
  const QUOTER_CONTRACT_ADDRESS = '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6';

  const provider = await getProvider();
  const quoterContract = new ethers.Contract(QUOTER_CONTRACT_ADDRESS, Quoter.abi, provider);

  const poolConstants = await getPoolConstants(inToken, outToken, amountIn, chain);

  const amountInReadable = fromReadableAmount(amountIn, inToken.decimals).toString();
  const quotedAmountOut = await quoterContract.quoteExactInputSingle.staticCall(
    poolConstants.token0,
    poolConstants.token1,
    poolConstants.fee,
    amountInReadable,
    0
  );

  const amountOutReadable = toReadableAmount(quotedAmountOut, outToken.decimals);

  return amountOutReadable;
}

async function getPoolConstants(inToken: TokenObjectStructure, outToken: TokenObjectStructure, amountIn: number, chain?: number): Promise<{
  token0: string,
  token1: string,
  fee: number
}> {
  const POOL_FACTORY_CONTRACT_ADDRESS = '0x1F98431c8aD98523631AE4a59f267346ea31F984';

  const currentPoolAddress = computePoolAddress({
    factoryAddress: POOL_FACTORY_CONTRACT_ADDRESS,
    tokenA: tokenConfig(inToken, outToken, amountIn, chain).tokens.in,
    tokenB: tokenConfig(inToken, outToken, amountIn, chain).tokens.out,
    fee: tokenConfig(inToken, outToken, amountIn, chain).tokens.poolFee,
  });

  const provider = await getProvider();
  const poolContract = new ethers.Contract(currentPoolAddress, IUniswapV3PoolABI.abi, provider);
  const [token0, token1, fee] = await Promise.all([
    poolContract.token0(),
    poolContract.token1(),
    poolContract.fee(),
  ]);
  return { token0, token1, fee };
}
