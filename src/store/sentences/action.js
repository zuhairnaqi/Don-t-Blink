import { SET_SENTENCES } from './actionTypes'

export const setSentences = sentences => ({
  type: SET_SENTENCES,
  payload: {
    sentences
  }
})
