import React from 'react'
import "./Service.css";

const page = ({params}) => {
  return (
    <main className='service-container'>
      {params.service};
    </main>
  )
}

export default page
