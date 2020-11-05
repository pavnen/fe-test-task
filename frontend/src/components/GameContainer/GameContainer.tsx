import React, {useState} from 'react'
import {PageSwitcher} from '../PageSwitcher/PageSwitcher'
import {ScorePage} from '../ScorePage/ScorePage'
import {GamePage} from '../GamePage/GamePage'

import styles from '../../App.module.css'
import {api} from '../../api/api'
import {GameResponse} from '../../api/api.models'

export enum PageToShow {
  Game = 'game',
  Score = 'score'
}

export const GameContainer: React.FC = () => {
  const [pageToShow, setPageToShow] = useState<PageToShow>(PageToShow.Game)
  const [game, setGame] = useState<GameResponse | null>(null)

  const updateGame = (gameResponse: GameResponse | void) => {
    if (gameResponse) {
      setGame(gameResponse)
    }
  }

  const getGame = () => api.game().then(updateGame)

  const reset = () => api.reset().then(updateGame)

  const move = (cell: number) => api.move(cell).then(updateGame)

  const pageDescriptions = [
    {title: 'game', callback: () => setPageToShow(PageToShow.Game)},
    {title: 'score', callback: () => setPageToShow(PageToShow.Score)}
  ]

  return (
    <div className={styles.gameContainer}>
      <header className={styles.gameContainerHeader}>The tic-tac-toe game</header>
      <PageSwitcher pages={pageDescriptions} />
      {
        pageToShow === PageToShow.Game
          ? <GamePage
              game={game}
              getBoardCallback={getGame}
              moveCallback={move}
              resetCallback={reset}
          />
          : <ScorePage getScore={api.score} />
      }
    </div>
  )
}
