import React from 'react'

function NoData({message}) {
  return (
    <div className='mx-3  rounded shadow-lg border w-full pt-1 text-center h-12 bg-gray-100 text-black'>
      {message}
    </div>
  )
}

export default NoData
