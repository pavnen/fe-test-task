import React, {useCallback, useState} from 'react'
import {Container} from 'react-bootstrap'
import {PageSwitcher} from '../PageSwitcher/PageSwitcher'
import {ScorePage} from '../ScorePage/ScorePage'
import {GamePage} from '../GamePage/GamePage'
import {api, GameResponse, ScoreResponse} from '../../api'

import styles from './GameContainer.module.css'

export enum PageToShow {
  Game = 'game',
  Score = 'score'
}

export const GameContainer: React.FC = () => {
  const [pageToShow, setPageToShow] = useState<PageToShow>(PageToShow.Game)
  const [game, setGame] = useState<GameResponse | null>(null)
  const [score, setScore] = useState<ScoreResponse | null>(null)

  const updateGame = (gameResponse: GameResponse | void) => {
    if (gameResponse) {
      setGame(gameResponse)
    }
  }

  const getGame = useCallback(() => api.game().then(updateGame), [])

  const reset = useCallback(() => api.reset().then(updateGame), [])

  const move = useCallback((cell: number) => api.move(cell).then(updateGame), [])

  const getScore = useCallback(() => api.score().then(
    res => res && setScore(res)
  ), [])

  const pageDescriptions = [
    {title: 'game', callback: () => setPageToShow(PageToShow.Game)},
    {title: 'score', callback: () => setPageToShow(PageToShow.Score)}
  ]

  return (
    <Container>
      <header className={styles.gameContainerHeader}>The tic-tac-toe game</header>
      <PageSwitcher currentPage={pageToShow} pages={pageDescriptions} />
        {
          pageToShow === PageToShow.Game
            ? <GamePage
                game={game}
                getBoardCallback={getGame}
                moveCallback={move}
                resetCallback={reset}
            />
            : <ScorePage score={score} getScore={getScore} />
        }
    </Container>
  )
}
