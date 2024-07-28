import Image from 'next/image'
import React from 'react'
import logo from '@/public/directprivateoffers-logo-bd.png'
import t from '@/styles/TopBar.module.css'

function TopBar() {
  return (
    <div className={t.topBar}>
      <div className={t.topContainer}>
        <h1>DIRECT PRIVATE OFFERS &quot;Global Expert Market&quot; </h1>
      </div>
      <div className={t.lowerContainer}>
        <div className={t.imageContainer}>
        <Image alt='logo' src={logo} />
        </div>
      </div>
    </div>
  )
}

export default TopBar