import Moralis from 'moralis';
export const getBalance = async (apiKey:string,walletAddress:string,address:string)=>{
    
try {
    if(!Moralis.Core.isStarted){
        await Moralis.start({
        apiKey
      });}
      console.log({apiKey,walletAddress,address})
let response
      if(address.toLocaleLowerCase()=="0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE".toLocaleLowerCase()){

   response = await Moralis.EvmApi.token.getWalletTokenBalances({
    "chain": "0x1",
    "address": walletAddress
  });
  return (response.toJSON().filter(e=>e.token_address=="0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" && e.name == "ethereum"))[0]

}else{
    response = await Moralis.EvmApi.token.getWalletTokenBalances({
        "chain": "0xa4b1",
        "address": walletAddress
      });
      return (response.toJSON().filter(e=>e.token_address==address ))[0]
 
}
} catch (e) {
  console.error(e);
  return null
}
}