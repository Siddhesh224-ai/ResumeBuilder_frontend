import React from 'react'

const Title = ({ title, description }) => {
  return (
    <div className='text-center mt-6 z-10 relative'>
      <h2 className='text-3xl sm:text-4xl font-semibold text-white tracking-tight'>{title}</h2>
      <p className='max-sm max-w-2xl mt-4 text-slate-400'>{description}</p>
    </div>
  )
}

export default Title
