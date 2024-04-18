import {createSlice, PayloadAction} from '@reduxjs/toolkit'


interface CodeState {
    code: string;
}

const initialState: CodeState = {
    code: 'from player import Player\nplayer = Player()\nplayer.move()',
};

export const codeSlice = createSlice({
    name: 'code',
    initialState,
    reducers: {
        setCode: (state, action: PayloadAction<string>) => {
            state.code = action.payload;
        },
    },
});

export const {setCode} = codeSlice.actions;

export const selectCode = (state: { code: CodeState }) => state.code.code;

export default codeSlice.reducer;