import React from 'react';
import { Editor } from '@monaco-editor/react';

const CodeEditor = () => {
    return (
        <Editor
            width="80vh"
            height="90vh"
            defaultLanguage="python"
            theme="vs-dark"
            className="p-8"
            defaultValue="// some comment"
        />
    );
};

export default CodeEditor;