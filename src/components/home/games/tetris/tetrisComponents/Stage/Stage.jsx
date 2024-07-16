import React from 'react'
import Cell from '../Cell/Cell'

const Stage = ({stage}) => {
  return (
    <div className='stage'>
        {stage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} /> ))}
    </div>
  )
}

export default Stage