import React from 'react'
import RegisterBack from '../assets/registerback.png'


const backgroCom = () => {
  return (
    <div className='float-right w-6/12'>
    <img src={RegisterBack} alt='' className='h-screen w-screen' />
    {/* <video  controls >
      <source src={VIDEO} type="video/mp4"/>
     </video> */}
    <p className='absolute top-20  w-6/12 text-white text-4xl  text-center  ' >
      Your Personal Job Finder
    </p>
   
    </div>
    
  )
}

export default backgroCom