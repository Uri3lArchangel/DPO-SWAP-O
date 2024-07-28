import React from 'react';
import Typewriter from 'typewriter-effect';


function TypeWritter({text}:{text:string}) {
  return (
    <h1 className='h-[70px] sm:h-[100px]'>
    <Typewriter
      options={{
        strings: [`${text}`],
        autoStart: true,
        loop: false,
        delay: 2,
        deleteSpeed: 50,
        cursor:'_',
        wrapperClassName: 'typewriter-wrapper',
        
      }}

      />
  </h1>
  )
}

export default TypeWritter