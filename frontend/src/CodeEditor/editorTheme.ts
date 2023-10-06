import * as monaco from 'monaco-editor';

export const editorTheme = () => {
    monaco.editor.defineTheme('customTheme', {
        base: 'vs-dark',
        inherit: true,
        rules: [
            {
                token: 'comment',
                foreground: '#5d7988',
                fontStyle: 'italic'
            },
            { token: 'constant', foreground: '#e06c75' }
        ],
        colors: {
            'editor.background': '#21252b'
        }
    });
    monaco.editor.setTheme('customTheme');
}