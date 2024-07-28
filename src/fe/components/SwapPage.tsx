"use client";
import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { tokensData } from "@/src/data/TokenData";
// import { RTB } from "@/src/web3/returnTokenBalance";
import Image from "next/image";
import sw from '@/styles/Swap.module.css'
import { HiChevronDown } from "react-icons/hi";
import TypeWritter from "./Typewriter";
import Dropdown from "./Dropdown";
import CustomConnectBtn from "./CustomConnectBtn";
import { quote } from "@/src/apis/uniswap/quote";

function SwapPage({ apikey,inchKey }: { apikey: string,inchKey:string }) {
  
  // value passed into from token input field
  const inputValueRef = useRef<HTMLInputElement>(null)


  const [outputAmount,setOutputAmount] = useState<string|null>("")



  // balance of from token
  const [balance, setBalance] = useState<string|null>('');

  //modal state
  const [modal, setModal] = useState(false);

  // modal instance for
  const [modalInstance, setModalInstance] = useState<"from" | "to">("from");

  const [selectedFromToken, setSelectedFromToken] = useState("Wrapped Ether");

  const [selectedToToken, setSelectedToToken] = useState("Tether USD")
 

  // amount of slippage
  const [slippageValue, setSlippageValue] = useState<number>(1);

  const [fromPrice, setFromPrice] = useState<string | null>("");

  const [toPrice, setToPrice] = useState<string|null>("");

  const slippageRef = useRef<HTMLSelectElement>(null);




  
  const onQuote = useCallback(async (value:string) => {
    setOutputAmount(await quote(tokensData[selectedFromToken],tokensData[selectedToToken],Number(value)))
  }, [selectedFromToken,selectedToToken])



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

async function inputChange(e:React.ChangeEvent<HTMLInputElement>) {
  if(e.currentTarget.value.length >=5){
    e.currentTarget.value = e.currentTarget.value.slice(0,6)
    
  }
}

  async function changeValue(e: React.KeyboardEvent<HTMLInputElement>) {
    if(!inputValueRef || !inputValueRef.current)return
    let v = inputValueRef.current.value

    if(v == ''){
      
      setOutputAmount("")
      
    }
    if(!isNaN((Number(v))) && v.length>0) {
      if(Number(v) == 0 ){
        setOutputAmount('0')
        return
      }
    setOutputAmount(null)
    if(selectedFromToken == selectedToToken){
      setOutputAmount(v)
      return
    }
    await onQuote(v) 

    }
  }
  const max = async () => {
    (document.getElementById("input1") as HTMLInputElement).value =
      String(balance);
  };

 


  return (
    <main>
      {}
      <article id="main" className={sw.main} onClick={(e) => {}}>
        <div className={sw.Container}>
          <TypeWritter text="DPO SWAP" />
          <section className={sw.swapContainer}>
            <section className={sw.fromSwapContainer +' swap-div bg-black/70 py-6 rounded-3xl px-8  mb-2'}>
              <div className=" p-4">
                <button id="from" className={sw.SwapButton} onClick={openModal}>
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
                      <option value="1" >Slippage: 1%</option>
                      <option value="2">Slippage: 2%</option>
                      <option value="5">Slippage: 5%</option>
                      <option value="01">Slippage: 10%</option>
                      <option value="20">Slippage: 20%</option>
                      <option value="25">Slippage: 25%</option>
                      <option value="50">Slippage: 50%</option>
                      <option value="70">Slippage: 70%</option>
                      <option value="100">Slippage: 100%</option>
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
                  ref={inputValueRef}
                  type="number"
                  className={sw.input + ' bg-transparent placeholder:text-[#ddd] text-white py-4 outline-none text-2xl'}
                  placeholder="Enter Amount"
                  onKeyUp={changeValue}
                  maxLength={6}
                  onChange={inputChange}
                />
                {fromPrice?<span className="text-white text-xl">${fromPrice}</span>:<>Loading Price..</>}
              </div>
            </section>

            <section className={sw.toSwapContainer+' swap-div bg-black/70 rounded-3xl '}>
              <button id="to" onClick={openModal} className={sw.SwapButton}>
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
                  className={sw.input + ' bg-transparent placeholder:text-[#ddd] text-white py-4 outline-none text-2xl'}
                  value={
                  outputAmount==null?"Loading Please Wait...":Number(outputAmount)
                  }
                  readOnly
                />
                {toPrice?<span className="text-white text-xl">${toPrice}</span>:<>Loading Price..</>}
              </div>
            </section>
            <div className={"my-3 " + sw.connectButtonContainer}>
              <CustomConnectBtn
                confirmSwap={()=>{}}
                outputAmount={outputAmount}
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
