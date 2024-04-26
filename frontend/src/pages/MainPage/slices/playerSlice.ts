import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface PlayerState {
    position: [number, number, number]
}


const initialState: PlayerState = {
    position: [180, 0, 180]
}

export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        move: (state, action: PayloadAction) => {
            state.position[0] -= 20
        },
    },
})


export const { move } = playerSlice.actions;

export const selectPlayerPosition = (state: { player: PlayerState }) => state.player.position;

export default playerSlice.reducer;