import React, { useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';

const CodeEditor: React.FC = () => {
  const getAutocompleteSuggestions = (
    model: monaco.editor.ITextModel,
    position: monaco.Position
  ) => {
    const word = model.getWordUntilPosition(position);
    const range = new monaco.Range(
      position.lineNumber,
      word.startColumn,
      position.lineNumber,
      word.endColumn
    );

    // This section makes custom suggestions for the autocomplete.
    const suggestions: monaco.languages.CompletionItem[] = [

    ];

    return { suggestions: suggestions, incomplete: false };
  };

  useEffect(() => {
    const provider = monaco.languages.registerCompletionItemProvider('python', {
      provideCompletionItems: getAutocompleteSuggestions,
    });

    return () => {
      provider.dispose();
    };
  }, []);

  return (
    <div className="p-8 m-8 bg-slate-950 rounded-lg w-3/6">
      <Editor
        theme="vs-dark"
        height="90vh"
        defaultLanguage="python"
        defaultValue="#Type your code here"
      />
    </div>
  )
};

export default CodeEditor;
