import * as React from 'react'
import ReactDOM from 'react-dom/client'
import {Provider} from 'react-redux'
import {store} from './state'
import App from './app'

const el = document.getElementById('root') as HTMLDivElement
const root = ReactDOM.createRoot(el)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
