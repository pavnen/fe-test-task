import React, {useEffect} from 'react'
import {Button, Col, Row} from 'react-bootstrap'
import classnames from 'classnames'
import {GameResponse} from '../../api/api.models'
import {isEmptyCell, getCellSymbol} from './GamePage.utils'

import styles from './GamePage.module.css'

export interface GamePageProps {
  game?: GameResponse | null
  getBoardCallback: () => Promise<GameResponse | void>
  moveCallback: (cell: number) => Promise<GameResponse | void>
  resetCallback: () => Promise<GameResponse | void>
}

export const GamePage: React.FC<GamePageProps> = ({game, getBoardCallback, moveCallback, resetCallback}) => {
  useEffect(() => {
    getBoardCallback()
  }, [getBoardCallback])

  if (!game) {
    return <div>'Waiting for board...'</div>
  }

  const moveCallbackFactory = (cell: number | string) =>
    !game?.end && isEmptyCell(cell) ? () => moveCallback(cell as number) : () => null

  return (
    <>
      <Row className={styles.boardWrapper}>
        <div>
          {game.board.map((row, rowIndex) => (
            <div className={styles.row} key={rowIndex}>
              {row.map((cell, cellIndex) => {
                const cellClass = classnames(styles.cell, {
                  [styles.ai]: cell === game.ai,
                  [styles.player]: cell === game.player
                })
                const cellCallback = moveCallbackFactory(cell)
                return (
                  <div className={cellClass} key={`${rowIndex}-${cellIndex}`} onClick={cellCallback}>
                    {getCellSymbol(cell)}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </Row>
      <Row className="justify-content-sm-center">
        {game?.end && (
          <Col className={styles.result} md="auto">
            <span>{game?.winner ? `${game.winner} won!` : 'Game Over!'}</span>
          </Col>
        )}
        <Col md="auto">
          <Button onClick={resetCallback}>Reset</Button>
        </Col>
      </Row>
    </>
  )
}
