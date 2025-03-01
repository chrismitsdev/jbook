import * as React from 'react'
import {useDispatch} from 'react-redux'
import {bindActionCreators} from 'redux'
import {actionCreators} from '../state'

export function useActions(): typeof actionCreators {
  const dispatch = useDispatch()

  return React.useMemo(
    function () {
      return bindActionCreators(actionCreators, dispatch)
    },
    [dispatch]
  )
}
