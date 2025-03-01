import {createStore, applyMiddleware, type Middleware} from 'redux'
import {thunk} from 'redux-thunk'
import reducers from './reducers'
import {persistMiddleware} from './middlewares/persist-middleware'

export const store = createStore(
  reducers,
  {},
  applyMiddleware(persistMiddleware as Middleware, thunk)
)
