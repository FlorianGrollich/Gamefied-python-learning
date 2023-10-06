import React, {useEffect} from 'react';
import {Editor} from '@monaco-editor/react';
import {editorTheme} from "./editorTheme";

const CodeEditor = () => {
    return (
        <div className="p-8 m-8 bg-slate-950 rounded-lg w-3/6">
            <Editor
                theme="customTheme"
                height="90vh"
                defaultLanguage="python"
                defaultValue="// some comment"
                onMount={editorTheme}
            />
        </div>

    );
};

export default CodeEditor;