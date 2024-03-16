import {Editor} from '@monaco-editor/react'
import * as monaco from 'monaco-editor'
import React, {useEffect} from "react";
import {useSelector} from "react-redux";

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
    const code = useSelector((state: any) => state.code.code);

    return (
        <div className="bg-slate-800 p-4 rounded-2xl">
            <Editor
                height="100vh"
                width="100%"
                defaultValue={code}
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
