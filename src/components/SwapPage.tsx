"use client";
import React, { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { useAccount } from "wagmi";
import { web3 } from "@/src/web3/metamaskConect";
import { message } from "antd";
import { tokensData } from "@/src/core/tokenData";
import { RTB } from "@/src/web3/returnTokenBalance";
import { priceFetch } from "@/src/web3/getPrice";
import TypeWritter from "./TypeWritter";
import hm from "@/styles/Home.module.css";
import Image from "next/image";
import { HiChevronDown } from "react-icons/hi";
import CustomCOnnectButton from "./CustomCOnnectButton";
import Dropdown from "./Dropdown";
import axios from "axios";
import { getBalance } from "../web3/getBalance";

function SwapPage({ apikey }: { apikey: string }) {
  // variables and states that hold the token addresses of selected tokens
  let fromToken: string = "";
  const [fromTokenState, setFromToken] = useState<string>(
    "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
  );
  let toToken: string = "";
  const [toTokenState, setToToken] = useState(
    "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9"
  );

  // value passed into from token input field
  const [value, setValue] = useState<string>();

  // value converted
  const [valueExchanged, setValueExchanged] = useState<string>("");

  // token decimals, hardcoded now
  const [valueExchangedDecimals, setValueEXchangedDecimals] = useState(1e18);

  // 1inch aggregator address
  const [to, setTo] = useState("");

  // transaction data to be sent to the blockchain
  const [txData, setTxData] = useState("");

  // balance of from token
  const [balance, setBalance] = useState<string|null>('');

  // address of current user connected
  const { address, isConnected } = useAccount();

  // the from or to button clicked on
  const [selectedButton, setButton] = useState<HTMLElement>();

  // the name of the token selected
  let tokenName: string = "";

  // id of from or to button selected

  //modal state
  const [modal, setModal] = useState(false);

  // modal instance for
  const [modalInstance, setModalInstance] = useState<"from" | "to">("from");

  const [selectedFromToken, setSelectedFromToken] = useState("Ethereum");

  const [selectedToToken, setSelectedToToken] = useState("Tether USD");

  // image of currently selected token
  const [fromTokenImage, setFromTokenImage] = useState(
    "https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png"
  );
  const [toTokenImage, setToTokenImage] = useState(
    "https://tokens.1inch.io/0xdac17f958d2ee523a2206206994597c13d831ec7.png"
  );

  // amount of slippage
  const [slippageValue, setSlippageValue] = useState<number>(1);

  const [fromPrice, setFromPrice] = useState("");

  const [toPrice, setToPrice] = useState("");

  const slippageRef = useRef<HTMLSelectElement>(null);

  const [messageApi, contextHolder] = message.useMessage();

  const [priceUSD,setPriceUSD]=useState<null | number>(null)

  //transaction message for swap
  const txObject = {
    from: address,
    to: to,
    value: String(value),
    data: String(txData),
  };
  useEffect(()=>{
    const run=async() =>{
    setFromPrice( ((await priceFetch(apikey,tokensData[selectedFromToken].address))!.usdPrice).toFixed(2))
    if(useAccount().address){
      const a = await getBalance(apikey,String(useAccount().address),tokensData[selectedFromToken].address)
     setBalance(a!.balance)
    }
    }
run()
  },[selectedFromToken])

  useEffect(()=>{
    const run=async() =>{
    setToPrice( ((await priceFetch(apikey,tokensData[selectedToToken].address))!.usdPrice).toFixed(2))
      if(useAccount().address){
        const a = await getBalance(apikey,String(useAccount().address),tokensData[selectedFromToken].address)
       setBalance(a!.balance)
      }
    
    }
run()
  },[selectedToToken])

  


  const confirmSwap = async () => {
    try {
      if (web3) {
        const sendTx = await web3.eth.sendTransaction(txObject);
        console.log(sendTx);
      } else {
        return;
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  // modal functions

  const changeModalState = () => {
    setModal(!modal);
  };
  const openModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    setModal(true);
    setModalInstance(e.currentTarget.id as "from" | "to");
  };
  const closeModal = () => {
    setModal(false);
  };

  const selectToken = (
    e: React.MouseEvent<HTMLButtonElement | HTMLLIElement>
  ) => {
    if (modalInstance == "from") {
      setSelectedFromToken(e.currentTarget.id);
    }
    if(modalInstance == 'to'){
      setSelectedToToken(e.currentTarget.id);
      
    }
  };

  

  async function changeValue(e: ChangeEvent<HTMLInputElement>) {
    let value = parseFloat(e.currentTarget.value);
    setValue(`${value * 1e18}`);
    setValueExchanged("");
    console.log(value);
  }
  const max = async () => {
    (document.getElementById("input1") as HTMLInputElement).value =
      String(balance);
    await getInchSwap();
  };
  async function getInchSwap() {
    try {
      setSlippage();
      if (fromTokenState != "" && toTokenState != "") {
        if (!address || address === "0x ") {
          console.log(address);
          alert("Please connect your wallet");
          return;
        } else if (!slippageValue || slippageValue < 1 || slippageValue > 50) {
          messageApi.error("Slippage error", 5);
          setTimeout(() => {
            messageApi.destroy();
          });
        }
        console.log("slippageValue", slippageValue);
        const tx = await axios.get(
          `https://api.1inch.io/v5.0/42161/swap?fromTokenAddress=${fromTokenState}&toTokenAddress=${toTokenState}&amount=${value}&fromAddress=${address}&slippage=${slippageValue}`
        );
        setTo(tx.data.tx.to);
        setTxData(tx.data.tx.data);
        setValueEXchangedDecimals(Number(`1E${tx.data.toToken.decimals}`));
        setValueExchanged(tx.data.toTokenAmount);
        console.log(tx.data);
      } else {
        setValueExchanged("select a token to convert from and to convert to");
      }
    } catch (err: any) {
      if (err.response.data.description == "Internal Server Error") {
        setValueExchanged(" ");
      } else {
        setValueExchanged(err.response.data.description);
        console.log(valueExchanged);
      }
    }
  }
  const setSlippage = () => {
    if (slippageRef.current) {
      setSlippageValue(parseInt(slippageRef.current?.value));
    }
  };
  useEffect(() => {
    const init = async () => {
      RTB(apikey, address!);
    init();
    }
  }, [address, fromTokenImage]);

  return (
    <main>
      {contextHolder}
      <article id="main" className={hm.main} onClick={(e) => {}}>
        <div className={hm.Container}>
          <TypeWritter text="DPO SWAP" />
          <section className={hm.swapContainer}>
            <section className={hm.fromSwapContainer +' swap-div bg-black/70 py-6 rounded-3xl px-8  mb-2'}>
              <div className=" p-4">
                <button id="from" className={hm.SwapButton} onClick={openModal}>
                  <Image
                    src={tokensData[selectedFromToken].logo}
                    width="240"
                    decoding="sync"
                    loading="eager"
                    fetchPriority="high"
                    height="240"
                    alt="logo"
                  />
                  <p className="mx-2 text-2xl">
                    {tokensData[selectedFromToken].symbol}
                  </p>
                  <HiChevronDown className="mx-1" size={15} />
                </button>

                <div className="">
                  <p className="text-right text-2xl my-2 text-white">
                    Balance: {balance}
                  </p> 
                  <div className="flex flex-col items-end space-y-4">
                  
                 <label htmlFor="slippage" className="bg-[var(--theme-green)]  p-3 cursor-pointer outline-none rounded-lg text-white text-2xl ">
                    <select
                  
                      id="slippage"
                      ref={slippageRef}
                      className="bg-[var(--theme-green)] outline-none cursor-pointer"
                    >
                      <option value="1" >Slippage: 2%</option>
                      <option value="5">Slippage: 10%</option>
                      <option value="25">Slippage: 50%</option>
                      <option value="35">Slippage: 70%</option>
                      <option value="50">Slippage: 100%</option>
                    </select>
                    </label>
                       <button
                      onClick={max}
                      className=" border-[#fff] text-[#fff] border w-fit px-6 py-3  rounded-xl text-xl"
                    >
                      Max
                    </button>
                  </div>
                </div>
              </div>
              <label htmlFor="input1"></label>
              <div className="flex justify-between items-center py-6 bg-[#0003] rounded-3xl px-8 ">
                <input
                  id="input1"
                  type="number"
                  className={hm.input + ' bg-transparent placeholder:text-[#ddd] text-white py-4 outline-none text-2xl'}
                  placeholder="Enter Amount"
                  onChange={changeValue}
                  onKeyUp={getInchSwap}
                  maxLength={6}
                />
                <span className="text-white text-xl">${fromPrice}</span>
              </div>
            </section>

            <section className={hm.toSwapContainer+' swap-div bg-black/70 rounded-3xl '}>
              <button id="to" onClick={openModal} className={hm.SwapButton}>
                <Image
                  src={tokensData[selectedToToken].logo}
                  width="240"
                  height="240"
                  decoding="sync"
                  fetchPriority="high"
                  loading="eager"
                  alt="logo"
                />
                <p className="mx-2 text-2xl">
                  {tokensData[selectedToToken].symbol}
                </p>
                <HiChevronDown className="mx-1" size={15} />
              </button>
              <label htmlFor="input2Disabled"></label>
              <div className="flex justify-between items-center py-6 bg-[#0003] rounded-3xl px-8  my-4" >
                <input
                  id="input2Disabled"
                  type="number"
                  placeholder="Amount to Receive"
                  className={hm.input + ' bg-transparent placeholder:text-[#ddd] text-white py-4 outline-none text-2xl'}
                  value={
                    !valueExchanged
                      ? ""
                      : (
                          parseFloat(valueExchanged) / valueExchangedDecimals
                        ).toFixed(4) == "NaN"
                      ? valueExchanged
                      : (
                          parseFloat(valueExchanged) / valueExchangedDecimals
                        ).toFixed(4)
                  }
                  readOnly
                />
                <span className="text-white text-xl">${toPrice}</span>
              </div>
            </section>
            <div className={"my-3 " + hm.connectButtonContainer}>
              <CustomCOnnectButton
                confirmSwap={confirmSwap}
                valueExchanged={valueExchanged}
                valueExchangedDecimals={valueExchangedDecimals}
              />
            </div>
          </section>
        </div>
      </article>

      {modal ? (
        <Dropdown
          modal={modal}
          setModal={setModal}
          selectToken={selectToken}
        />
      ) : (
        <></>
      )}
    </main>
  );
}

export default SwapPage;
