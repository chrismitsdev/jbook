import type {Dispatch} from 'redux'
import {Action} from '../actions'
import {ActionType} from '../action-types'
import {saveCells} from '../action-creators'
import {RootState} from '../reducers'

export const persistMiddleware = function ({
  dispatch,
  getState
}: {
  dispatch: Dispatch<Action>
  getState: () => RootState
}) {
  let timer: NodeJS.Timeout

  return function (next: (action: Action) => void) {
    return function (action: Action) {
      next(action)

      if (
        [
          ActionType.MOVE_CELL,
          ActionType.UPDATE_CELL,
          ActionType.INSERT_CELL_AFTER,
          ActionType.DELETE_CELL
        ].includes(action.type)
      ) {
        if (timer) {
          clearTimeout(timer)
        }

        timer = setTimeout(function () {
          saveCells()(dispatch, getState)
        }, 250)
      }
    }
  }
}
