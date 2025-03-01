import './text-editor.css'
import * as React from 'react'
import MDEditor from '@uiw/react-md-editor'
import {useActions} from '../../hooks/use-actions'
import {Cell} from '../../state'

interface TextEditorProps {
  cell: Cell
}

const TextEditor: React.FC<TextEditorProps> = ({cell}) => {
  const [editing, setEditing] = React.useState<boolean>(false)
  const ref = React.useRef<HTMLDivElement | null>(null)
  const {updateCell} = useActions()

  React.useEffect(function () {
    function listener(event: MouseEvent) {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return
      }

      setEditing(false)
    }

    document.addEventListener('click', listener, {capture: true})

    return function () {
      document.removeEventListener('click', listener, {capture: true})
    }
  }, [])

  if (editing) {
    return (
      <div
        className='text-editor'
        ref={ref}
      >
        <MDEditor
          value={cell.content}
          onChange={(v) => updateCell(cell.id, v || '')}
        />
      </div>
    )
  }

  return (
    <div
      className='text-editor card'
      onClick={() => setEditing(true)}
    >
      <div className='card-content'>
        <MDEditor.Markdown source={cell.content || 'Click to edit'} />
      </div>
    </div>
  )
}

TextEditor.displayName = 'TextEditor'

export default TextEditor
