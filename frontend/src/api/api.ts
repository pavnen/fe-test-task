import {ApiResponse, ScoreResponse, GameResponse} from './api.models'
import {BASE_API_URL, GAME_URL, MOVE_URL, RESET_URL, SCORE_URL} from '../constants/urls'

const getResult = (response: ApiResponse) => response.ok ? response.result : Promise.reject(response.error)

const client = (url: string, options: RequestInit) => {
  const defaultHeaders = {
    'Content-Type': 'application/json'
  }
  const headers = {...options.headers, ...defaultHeaders}

  return fetch(`${BASE_API_URL}/${url}`, {...options, headers})
    .then(response => response.json())
    .then(getResult)
    .catch(err => console.error(err))
}

const get = (url: string, options: RequestInit = {}) => client(url, {...options, method: 'GET'})

const post  = (url: string, options: RequestInit = {}) => client(url, {...options, method: 'POST'})

const score = (): Promise<ScoreResponse | void> => get(SCORE_URL)

const game = (): Promise<GameResponse | void> => get(GAME_URL)

const move = (index: number): Promise<GameResponse | void> => post(MOVE_URL, {body: JSON.stringify({index})})

const reset = (): Promise<GameResponse | void> => post(RESET_URL)

export const api = {
  game,
  move,
  reset,
  score
}
