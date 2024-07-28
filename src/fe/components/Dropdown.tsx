'use client'
import Image from "next/image";
import React, {  SetStateAction, useRef, useState } from "react";
import {commonCoins, tokensDataArry } from "@/src/data/TokenData";
import ModalApp, { ModalStyles } from "@/src/fe/lib/Modals";
import hm from '@/styles/Dropdown.module.css'
import { ChevronLeft } from "lucide-react";



const styles = {mask:{backdropFilter:"blur(6px)"},"body":{backgroundColor:"transparent"},header:{backgroundColor:"transparent"},content:{backgroundColor:"#000",color:"#fff"},wrapper:{backgroundColor:"#fff3"},footer:{backgroundColor:"transparent"}} as ModalStyles

function Dropdown({modal,setModal,selectToken}:{modal:boolean,setModal:React.Dispatch<SetStateAction<boolean>>,selectToken:React.MouseEventHandler}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [tokenArray,setTokenArray]=useState(tokensDataArry)
  const filterTokens = ()=>{
    if(!inputRef || !inputRef.current)return
    const search = inputRef.current.value.toLocaleLowerCase();
   setTokenArray( tokensDataArry.filter(a=>a.name.toLocaleLowerCase().includes(search) || a.symbol.toLocaleLowerCase().includes(search)))
  }
  return (
<ModalApp state={modal} setState={setModal} styles={styles}>
  <div className="flex  my-6  ">
  <ChevronLeft className="flex-2 items-center cursor-pointer " onClick={()=>{
    setModal(false)
  }} />

    <h3 className="text-center text-4xl font-semibold flex-1">Select Token</h3>
    </div>
    <input
      onChange={filterTokens}
        type="text"
        id="TokenAddress"
        ref={inputRef}
        className="h-20 px-4 text-2xl sm:text-3xl text-white/95 outline-none w-full bg-transparent border border-[var(--theme-green)] rounded-3xl"
        placeholder="Input Token Address or Search Existing Tokens"
      />
      
      <section className="flex mt-12 flex-wrap">
        {
          commonCoins.map((e,i)=>(
         <button id={e.name} key={i} onClick={(e)=>{selectToken(e);setModal(false)}} className="m-4 flex  items-center border border-[#fff9] hover:border-[var(--theme-green)] rounded-3xl p-2">
          <Image src={e.logo} alt={e.name} width={30} height={30} />
          <span>{e.symbol}</span>
        </button>
          ))
        }
   
      </section>
      <hr className="text-[#729502] my-12 opacity-[0.7]" />
      <ul className={hm.dropDownTokenList}>
        
        {tokenArray.map((item,index)=>(
        <li key={index}  id={item.name} onClick={(e)=>{selectToken(e);setModal(false)}}>
          <Image src={item.logo} width="120" height="120" alt="eth" /> <p className="text-[var(--theme-green)]">{item.name}</p>
        </li>))}
      </ul>
  </ModalApp>
  );
}

export default Dropdown;
