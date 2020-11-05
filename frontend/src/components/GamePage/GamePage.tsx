import React, {useEffect} from 'react'
import {Button} from 'react-bootstrap'
import {GameResponse} from '../../api/api.models'

import styles from './GamePage.module.css'

export interface GamePageProps {
  game?: GameResponse | null
  getBoardCallback: () => Promise<GameResponse | void>
  moveCallback: (cell: number) => Promise<GameResponse | void>
  resetCallback: () => Promise<GameResponse | void>
}

const isEmptyCell = (cell: number | string) => typeof cell === "number"

export const GamePage: React.FC<GamePageProps> = ({
    game,
    getBoardCallback,
    moveCallback,
    resetCallback
  }) => {

  useEffect(() => {
      getBoardCallback()
    }, [])

  if (!game) {
    return <div>'Waiting for board...'</div>
  }

  const moveCallbackFactory = (cell: number | string) =>
    !game?.end && isEmptyCell(cell) ? () => moveCallback((cell as number)) : () => null

  return (
    <>
      <div>
        {game.board.map((row, rowIndex) => (
          <div className={styles.row} key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <div className={styles.cell} key={`${rowIndex}-${cellIndex}`} onClick={moveCallbackFactory(cell)}>
                {typeof cell !== 'number' ? cell : '-'}
              </div>
            ))}
          </div>
        ))}
      </div>
      {game?.end && <span>{game?.winner ? `${game.winner} won!` : 'Game Over!'}</span>}
      <Button onClick={resetCallback}>Reset</Button>
    </>
  )
}
