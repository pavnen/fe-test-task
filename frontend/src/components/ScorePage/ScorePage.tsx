import React, {useEffect} from 'react'
import {Col, Row, Table} from 'react-bootstrap'
import {ScoreResponse} from '../../api'

import styles from './Scorepage.module.css'

export interface ScorePageProps {
  score: ScoreResponse | null
  getScore: () => Promise<ScoreResponse | void>
}

const getWinnerClass = (winner: string) => styles[winner]

export const ScorePage: React.FC<ScorePageProps> = ({score, getScore}) => {
  useEffect(() => {
    getScore()
  }, [getScore])

  if (!score) return null

  return (
    <>
      <Row className={styles.scoreCaption}>
        <Col className={styles.ai} sm={6}>
          AI wins: {score.ai}
        </Col>
        <Col className={styles.player} sm={6}>
          Human wins: {score.player}
        </Col>
      </Row>
      <Row>
        {score.list.length > 0 ? (
          <Table className={styles.table} striped size="sm">
            <thead>
              <tr>
                <th>Date/Time</th>
                <th>Winner</th>
                <th>Team</th>
              </tr>
            </thead>
            <tbody>
              {score.list.map(game => (
                <tr key={game.ts}>
                  <td>{new Date(game.ts).toLocaleString()}</td>
                  <td className={getWinnerClass(game.winner)}>{game.winner || '—'}</td>
                  <td>{game.team || '—'}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <span>No games played...</span>
        )}
      </Row>
    </>
  )
}
