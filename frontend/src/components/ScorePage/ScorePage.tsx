import React, {useEffect, useState} from 'react'
import {ScoreResponse} from '../../api/api.models'

export interface ScorePageProps {
  getScore: () => Promise<ScoreResponse | void>
}

export const ScorePage: React.FC<ScorePageProps> = ({getScore}) => {
  const [score, setScore] = useState<ScoreResponse | null>(null)

  useEffect(() => {
    getScore().then(
      res => res && setScore(res)
    )
  }, [getScore])

  return (
    <>
      {
        score
          ?
          <div>
            <div>AI wins: {score.ai}</div>
            <div>Human wins: {score.player}</div>
            <h2>Games:</h2>
            {score.list.length > 0
              ? <ul>
                {score.list.map((game ) => (
                  <li key={game.ts}>
                    <div>{(new Date(game.ts)).toLocaleString()}</div>
                    <div>winner: {game.winner}</div>
                    <div>team: {game.team}</div>
                  </li>
                ))}
              </ul>
              : <span>No games played...</span>
            }
          </div>
          : <span>No Scores...</span>
      }
    </>
  )
}
