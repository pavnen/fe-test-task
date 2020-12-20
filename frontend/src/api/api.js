
import {BASE_API_URL, GAME_URL, MOVE_URL, RESET_URL, SCORE_URL} from '../constants/urls'

const getResult = (response) => response.ok ? response.result : Promise.reject(response.error)

const client = (url, options) => {
  const defaultHeaders = {
    'Content-Type': 'application/json'
  }
  const headers = {...options.headers, ...defaultHeaders}

  return fetch(`${BASE_API_URL}/${url}`, {...options, headers})
    .then(response => response.json())
    .then(getResult)
    .catch(err => console.error(err))
}

const get = (url, options = {}) => client(url, {...options, method: 'GET'})

const post  = (url, options = {}) => client(url, {...options, method: 'POST'})

const score = () => get(SCORE_URL)

const game = () => get(GAME_URL)

const move = (index) => post(MOVE_URL, {body: JSON.stringify({index})})

const reset = () => post(RESET_URL)

export const api = {
  game,
  move,
  reset,
  score
}
