import './cell-list.css'
import * as React from 'react'
import {createSelector} from 'reselect'
import {useTypedSelector} from '../../hooks/use-typed-selector'
import {useActions} from '../../hooks/use-actions'
import {RootState} from '../../state'
import CellListItem from './../cell-list-item/cell-list-item'
import AddCell from './../add-cell/add-cell'

const selectCellsState = (state: RootState) => state.cells

const CellList: React.FC = () => {
  const cells = useTypedSelector(
    createSelector([selectCellsState], function ({order, data}) {
      return order.map(function (cellId) {
        return data[cellId]
      })
    })
  )
  const {fetchCells} = useActions()

  const renderedCells = cells.map((cell) => {
    return (
      <React.Fragment key={cell.id}>
        <CellListItem cell={cell} />
        <AddCell previousCellId={cell.id} />
      </React.Fragment>
    )
  })

  React.useEffect(
    function () {
      fetchCells()
    },
    [fetchCells]
  )

  return (
    <div className='cell-list'>
      <AddCell
        forceVisible={cells.length === 0}
        previousCellId={null}
      />
      {renderedCells}
    </div>
  )
}

CellList.displayName = 'CellList'

export default CellList
