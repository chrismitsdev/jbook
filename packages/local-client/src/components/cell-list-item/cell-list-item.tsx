import './cell-list-item.css'
import * as React from 'react'
import {Cell} from '../../state'
import ActionBar from '../action-bar/action-bar'
import CodeCell from '../code-cell/code-cell'
import TextEditor from '../text-editor/text-editor'

interface CellListItemProps {
  cell: Cell
}

const CellListItem: React.FC<CellListItemProps> = ({cell}) => {
  let child: React.JSX.Element

  if (cell.type === 'code') {
    child = (
      <>
        <div className='action-bar-wrapper'>
          <ActionBar id={cell.id} />
        </div>
        <CodeCell cell={cell} />
      </>
    )
  } else {
    child = (
      <>
        <ActionBar id={cell.id} />
        <TextEditor cell={cell} />
      </>
    )
  }

  return <div className='cell-list-item'>{child}</div>
}

CellListItem.displayName = 'CellListItem'

export default CellListItem
