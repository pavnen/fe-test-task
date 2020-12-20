import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api/api'

Vue.use(Vuex)

const SET_SCORE = 'SET_SCORE'

export const store = new Vuex.Store({
  state: {
    score: {
      ai: 0,
      player: 0,
      X: 0,
      '0': 0,
      list: []
    }
  },
  actions: {
    [SET_SCORE] ({commit}) {
      api.score().then(
        score => commit(SET_SCORE, score)
      )
    }
  },
  mutations: {
    [SET_SCORE] (state, payload) {
      Vue.set('score', payload)
    }
  }
})
