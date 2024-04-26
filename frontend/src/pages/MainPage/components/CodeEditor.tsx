import { Editor } from '@monaco-editor/react'
import * as monaco from 'monaco-editor'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCode } from '../slices/codeSlice'

function setEditorTheme(monaco: any) {
  monaco.editor.defineTheme('onedark', {
    base: 'vs-dark',
    inherit: true,
    rules: [{}],
    colors: {},
  })
  monaco.editor.setTheme('onedark')
}

const CodeEditor: React.FC = () => {
  const code = useSelector((state: any) => state.code.code)
  const dispatch = useDispatch()

  return (
    <div className="bg-white p-4 rounded-2xl">
      <Editor
        onChange={value => dispatch(setCode(value as string))}
        height="80vh"
        width="100%"
        defaultValue={code}
        defaultLanguage="python"
        beforeMount={monaco => {
          setEditorTheme(monaco)
        }}
        options={{
          automaticLayout: true,
          fontSize: 12,
        }}
      />
    </div>
  )
}

export default CodeEditor
