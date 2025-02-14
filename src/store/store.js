import { configureStore } from '@reduxjs/toolkit'
import unifiedSchemaReducer from './unifiedSchemaSlice'
import throttle from 'lodash/throttle'
import { saveState, loadState } from '../utils/localStorage'

export const store = configureStore({
  reducer: {
    schemas: unifiedSchemaReducer
  },
  preloadedState: loadState()
})

store.subscribe(throttle(() => {
  saveState({
    schemas: store.getState().schemas
  })
}, 1000))

