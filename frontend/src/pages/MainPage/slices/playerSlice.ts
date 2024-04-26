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
        doActions: (state, action: PayloadAction<string[]>) => {
            action.payload.forEach((action) => {
                if (action === 'Move') {
                    state.position[0] -= 20
                }
            })
        }
    },
})


export const { doActions } = playerSlice.actions;

export const selectPlayerPosition = (state: { player: PlayerState }) => state.player.position;

export default playerSlice.reducer;