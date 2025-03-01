import './code-editor.css'
import * as React from 'react'
import MonacoEditor, {type OnMount} from '@monaco-editor/react'

interface CodeEditorProps {
  initialValue: string
  onChange(value?: string): void
}

const CodeEditor: React.FC<CodeEditorProps> = ({initialValue, onChange}) => {
  const editorRef = React.useRef<Parameters<OnMount>[0] | null>(null)

  const handleEditorDidMount: OnMount = (editor) => {
    if (!editorRef.current) {
      editorRef.current = editor
    }
  }

  const handleFormatClick = () => {
    if (!editorRef.current) return

    const formatAction = editorRef.current.getAction(
      'editor.action.formatDocument'
    )

    if (formatAction) {
      formatAction.run()
    }
  }

  return (
    <div className='editor-wrapper'>
      <button
        className='button button-format is-primary is-small'
        onClick={handleFormatClick}
      >
        Format
      </button>
      <MonacoEditor
        theme='vs-dark'
        defaultValue={initialValue}
        defaultLanguage='javascript'
        onMount={handleEditorDidMount}
        onChange={onChange}
        options={{
          minimap: {enabled: false},
          wordWrap: 'on',
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          renderLineHighlight: 'none'
        }}
      />
    </div>
  )
}

CodeEditor.displayName = 'CodeEditor'

export default CodeEditor
