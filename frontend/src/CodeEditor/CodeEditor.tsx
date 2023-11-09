import React from 'react'
import { Editor } from '@monaco-editor/react'

const CodeEditor = () => {
  return (
    <div className="p-8 m-8 bg-slate-950 rounded-lg w-3/6">
      <Editor
        theme="vs-darkd"
        height="90vh"
        defaultLanguage="python"
        defaultValue="#some comment"
      />
    </div>
  )
}

export default CodeEditor
