import React from 'react'
import { TETROMINOS } from '../../setup'
import { StyledCell } from './Cell.styles'

const Cell = ({ type }) => {
  return (
    <StyledCell type={type} color={TETROMINOS[type].color} />
  );
}

export default React.memo(Cell)