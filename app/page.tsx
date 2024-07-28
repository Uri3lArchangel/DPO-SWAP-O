import SwapPage from "@/src/fe/components/SwapPage"
import React from "react"



function page() {
  return(
    <SwapPage apikey={ process.env.apiKey!} inchKey ={ process.env.INCHAPIKEY!} />
  )
}

export default page
