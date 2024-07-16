import React from 'react'

const StartButton = ({callBack}) => {
  return (
    <div className='p-3 border bg-purple-400' onClick={callBack}>Start Game</div>
  )
}

export default StartButton