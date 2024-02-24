import {Editor} from '@monaco-editor/react'
import * as monaco from 'monaco-editor'
import React, {useEffect} from "react";

function setEditorTheme(monaco: any) {
    monaco.editor.defineTheme('onedark', {
        base: 'vs-dark',
        inherit: true,
        rules: [
            {},
        ],
        colors: {}
    });
    monaco.editor.setTheme('onedark');
}

const CodeEditor: React.FC = () => {

    return (
        <div className="bg-slate-800 p-4 rounded-2xl">
            <Editor
                height="85vh"
                width="100%"
                defaultLanguage="python"
                beforeMount={(monaco) => {
                    setEditorTheme(monaco);
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
