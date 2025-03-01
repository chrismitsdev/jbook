import './code-cell.css'
import * as React from 'react'
import {Cell} from '../../state'
import {useActions} from '../../hooks/use-actions'
import {useTypedSelector} from '../../hooks/use-typed-selector'
import {useCumulativeCode} from '../../hooks/use-cumulative-code'
import Resizable from '../resizable/resizable'
import CodeEditor from '../code-editor/code-editor'
import Preview from '../preview/preview'

interface CodeCellProps {
  cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({cell}) => {
  const {updateCell, createBundle} = useActions()
  const bundle = useTypedSelector((state) => state.bundles[cell.id])
  const cumulativeCode = useCumulativeCode(cell.id)

  React.useEffect(
    function () {
      if (!bundle) {
        createBundle(cell.id, cumulativeCode)
        return
      }

      const timer = setTimeout(async function () {
        createBundle(cell.id, cumulativeCode)
      }, 750)

      return function () {
        clearTimeout(timer)
      }
    },
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
    [cumulativeCode, cell.content, cell.id, createBundle]
  )

  return (
    <Resizable direction='vertical'>
      <div style={{height: 'calc(100% - 10px)', display: 'flex'}}>
        <Resizable direction='horizontal'>
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value || '')}
          />
        </Resizable>
        <div className='progress-wrapper'>
          {!bundle || bundle.loading ? (
            <div className='progress-cover'>
              <progress
                className='progress is-small is-primary'
                max='100'
              >
                Loading
              </progress>
            </div>
          ) : (
            <Preview
              code={bundle.code}
              error={bundle.err}
            />
          )}
        </div>
      </div>
    </Resizable>
  )
}

CodeCell.displayName = 'CodeCell'

export default CodeCell
