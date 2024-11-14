import { Editor } from '@monaco-editor/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCode, setCode } from '../slices/sessionSlice';
import { WebSocketActionType } from '../utils/enums';

function setEditorTheme(monaco: any) {
  monaco.editor.defineTheme('onedark', {
    base: 'vs-dark',
    inherit: true,
    rules: [{}],
    colors: {},
  });
  monaco.editor.setTheme('onedark');
}

interface CodeEditorProps {
  sessionId: string | undefined;
}


const CodeEditor: React.FC<CodeEditorProps> = ({ sessionId }) => {
  const dispatch = useDispatch();
  const code = useSelector(selectCode);

  function handleCodeChange(value: string | undefined) {
    console.log(sessionId);
    if (value !== undefined && sessionId !== undefined) {
      console.log('sending code change');
      dispatch({
        type: WebSocketActionType.SOCKET_SEND,
        socketMsg: { type: 'codeChange', code: value, sessionId: sessionId },
      });
      dispatch(setCode(value));
    }
  }


  return (
    <div className="bg-white p-4 rounded-2xl">
      <Editor
        onChange={handleCodeChange}
        height="80vh"
        value={code}
        width="100%"
        defaultValue={code}
        defaultLanguage="python"
        beforeMount={monaco => {
          setEditorTheme(monaco);
        }}
        options={{
          automaticLayout: true,
          fontSize: 12,
        }}
      />
    </div>
  );
};

export default CodeEditor;
