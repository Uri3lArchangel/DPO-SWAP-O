import Moralis from 'moralis';


 export const fetchPrice = async(apiKey:string,address:string)=>{

try {
  if(address == "0x73ea12A934a9A08614D165DB30F87BdfD1A2Cb92") return {usdPrice:0}
  if(!Moralis.Core.isStarted){
    await Moralis.start({
    apiKey
  });}

  let response
  if(address.toLocaleLowerCase()=="0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE".toLocaleLowerCase()){
  response = await Moralis.EvmApi.token.getTokenPrice({
    "chain": "0x1",
    "address": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
  });
}else{
response = await Moralis.EvmApi.token.getTokenPrice({
  "chain": "0xa4b1",
  "address": address
});
}

 return response.toJSON()
} catch (e) {
  console.error(e);
}
}