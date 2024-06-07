import SwapPage from "../src/components/SwapPage"
import React from "react"



function page() {
  return(
    <SwapPage apikey={ process.env.apiKey!} />
  )
}

export default page
