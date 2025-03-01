import {Dispatch} from 'redux'
import axios from 'axios'
import {ActionType} from '../action-types'
import {
  UpdateCellAction,
  DeleteCellAction,
  MoveCellAction,
  InsertCellAfterAction,
  Direction,
  Action
} from '../actions'
import {Cell, CellType} from '../cell'
import {bundle} from '../../bundler'
import type {RootState} from '../reducers'

export function updateCell(id: string, content: string): UpdateCellAction {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content
    }
  }
}

export function deleteCell(id: string): DeleteCellAction {
  return {
    type: ActionType.DELETE_CELL,
    payload: id
  }
}

export function moveCell(id: string, direction: Direction): MoveCellAction {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction
    }
  }
}

export function insertCellAfter(
  id: string | null,
  type: CellType
): InsertCellAfterAction {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id,
      type
    }
  }
}

export function createBundle(cellId: string, input: string) {
  return async function (dispatch: Dispatch<Action>) {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        cellId
      }
    })

    const result = await bundle(input)

    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: result
      }
    })
  }
}

export function fetchCells() {
  return async function (dispatch: Dispatch<Action>) {
    dispatch({type: ActionType.FETCH_CELLS})

    try {
      const {data} = await axios.get<Cell[]>('/cells')

      dispatch({
        type: ActionType.FETCH_CELLS_COMPLETE,
        payload: data
      })
    } catch (error) {
      if (error instanceof Error) {
        dispatch({
          type: ActionType.FETCH_CELLS_ERROR,
          payload: error.message
        })
      }
    }
  }
}

export function saveCells() {
  return async function (
    dispatch: Dispatch<Action>,
    getState: () => RootState
  ) {
    const {
      cells: {data, order}
    } = getState()

    const cells = order.map((id) => data[id])

    try {
      await axios.post('/cells', {cells})
    } catch (error) {
      if (error instanceof Error) {
        dispatch({
          type: ActionType.SAVE_CELLS_ERROR,
          payload: error.message
        })
      }
    }
  }
}
