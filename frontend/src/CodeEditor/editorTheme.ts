import * as monaco from 'monaco-editor';

export const editorTheme = () => {
    console.log("edtiorTheme");
    monaco.editor.defineTheme('customTheme', {
        base: 'vs-dark',
        inherit: true,
        rules: [
            {
                token: 'comment',
                foreground: '#5d7988',
                background: '#000000',
                fontStyle: 'italic'
            },
            { token: 'constant', foreground: '#e06c75' }
        ],
        colors: {
            'editor.background': '#21252b',
            'editor.foreground': '#000000',

        }
    });
    monaco.editor.setTheme('customTheme');
}