import { configureStore } from '@reduxjs/toolkit'
import tableReducer from './tableSlice'
import throttle from 'lodash/throttle'
import { saveState, loadState } from '../utils/localStorage'

export const store = configureStore({
  reducer: {
    tables: tableReducer,
  
  },
  preloadedState: loadState()
})

store.subscribe(throttle(() => {
  saveState({
    tables: store.getState().tables
  })
}, 1000))


