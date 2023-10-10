import { MonacoLanguageClient, CloseAction, ErrorAction, MonacoServices, createConnection } from 'monaco-languageclient';

export const setupLanguageClient = (editor: monaco.editor.IStandaloneCodeEditor) => {
    // Install Monaco language client services to the editor
    MonacoServices.install(editor);

    // Create WebSocket connection
    const url = "ws://your-language-server-address";
    const webSocket = new WebSocket(url);

    // Listen when the WebSocket is opened
    webSocket.onopen = () => {
        const languageClient = createLanguageClient({
            name: "Sample Language Client",
            clientOptions: {
                // Use the WebSocket created above
                connectionProvider: {
                    get: (errorHandler, closeHandler) => {
                        return Promise.resolve(createConnection(webSocket, errorHandler, closeHandler));
                    }
                },
                // Automatic language detection
                documentSelector: ['python'],
                errorHandler: {
                    error: () => ErrorAction.Continue,
                    closed: () => CloseAction.DoNotRestart
                }
            }
        });

        // Start the language client
        languageClient.start();
    };
};
