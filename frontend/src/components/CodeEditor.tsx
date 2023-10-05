import React from 'react';
import { Editor } from '@monaco-editor/react';

const CodeEditor = () => {
    return (
        <div className="p-8 m-8 bg-slate-950 rounded w-3/6">
            <Editor
                height="90vh"
                defaultLanguage="python"
                theme="vs-dark"
                defaultValue="// some comment"
            />
        </div>

    );
};

export default CodeEditor;