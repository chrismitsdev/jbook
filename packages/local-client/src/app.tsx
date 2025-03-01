import 'bulmaswatch/superhero/bulmaswatch.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import * as React from 'react'
import CellList from './components/cell-list/cell-list'

const App: React.FC = () => {
  return <CellList />
}

App.displayName = 'App'

export default App
