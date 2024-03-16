import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios/index";

interface AuthState {
    token: string | null;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: AuthState = {
    token: null,
    status: 'idle',
}


export const login = createAsyncThunk(
    'auth/login',
    ({username, password}: { username: string; password: string }, {rejectWithValue}) => {
        return axios.post('/api/login', {username, password})
            .then(response => {
                return response.data.token;
            })
            .catch(error => {
                const message = error.response && error.response.data.message
                    ? error.response.data.message
                    : 'Could not log in';
                return rejectWithValue(message);
            });
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'idle';
                state.token = action.payload;
            })
            .addCase(login.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default authSlice.reducer;