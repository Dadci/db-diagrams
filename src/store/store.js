import { configureStore } from '@reduxjs/toolkit'
import tableReducer from './tableSlice'

import throttle from 'lodash/throttle'
import { saveState, loadState } from '../utils/localStorage'
import schemaReducer from './schemaSlice'

export const store = configureStore({
  reducer: {
    tables: tableReducer,
    schemas: schemaReducer
  
  },
  preloadedState: loadState()
})

store.subscribe(throttle(() => {
  saveState({
    tables: store.getState().tables,
    schemas: store.getState().schemas

  })
}, 1000))


