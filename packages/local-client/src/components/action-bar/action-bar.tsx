import './action-bar.css'
import * as React from 'react'
import {useActions} from '../../hooks/use-actions'
import ActionButton from '../action-button'

interface ActionBarProps {
  id: string
}

const ActionBar: React.FC<ActionBarProps> = ({id}) => {
  const {moveCell, deleteCell} = useActions()

  return (
    <div className='action-bar'>
      <ActionButton
        className='fa-arrow-up'
        onClick={() => moveCell(id, 'up')}
      />
      <ActionButton
        className='fa-arrow-down'
        onClick={() => moveCell(id, 'down')}
      />
      <ActionButton
        className='fa-times'
        onClick={() => deleteCell(id)}
      />
    </div>
  )
}

ActionBar.displayName = 'ActionBar'

export default ActionBar
