import {createSelector} from 'reselect'
import {useTypedSelector} from './use-typed-selector'
import {RootState} from '../state'

const selectCellsState = (state: RootState) => state.cells

export function useCumulativeCode(cellId: string) {
  return useTypedSelector(
    createSelector([selectCellsState], function ({order, data}) {
      const orderedCells = order.map(function (cellId) {
        return data[cellId]
      })

      const showFunc = `
          import _React from 'react'
          import _ReactDOM from 'react-dom/client'
  
          var show = (value) => {
            const rootEl = document.querySelector('#root')
          
            if (typeof value === 'object') {
              if (value.$$typeof && value.props) {
                _ReactDOM.createRoot(rootEl).render(value)
              } else {
                rootEl.innerHTML = JSON.stringify(value)
              }
            } else {
              rootEl.innerHTML = value
            }
          }
        `

      const showFuncNoop = `var show = () => {}`

      const cumulativeCode: string[] = []

      for (const c of orderedCells) {
        if (c.type === 'code') {
          if (c.id === cellId) {
            cumulativeCode.push(showFunc)
          } else {
            cumulativeCode.push(showFuncNoop)
          }

          cumulativeCode.push(c.content)
        }

        if (c.id === cellId) {
          break
        }
      }

      return cumulativeCode
    })
  ).join('\n')
}
