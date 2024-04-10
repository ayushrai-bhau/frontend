import React from 'react'
import AddjobCom from "../component/addjobcom"
import JobBack from "../assets/jobBack.png"
const addJob = () => {
  return (
    <div>
    
    <img src={JobBack} className='h-screen w-[40%] float-end'/> 
    <p className='absolute left-[67%] top-[5%] text-white text-[40px]'>Recruiter add job details here</p>
    <AddjobCom/></div>
  )
}

export default addJob