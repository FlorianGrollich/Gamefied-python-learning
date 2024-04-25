import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from 'axios';
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;

interface AuthState {
    token: string | null;
    status: 'idle' | 'loading' | 'failed';
}
const loadToken = () => localStorage.getItem('token');

const initialState: AuthState = {
    token: loadToken(),
    status: 'idle',
}

export const register = createAsyncThunk(
    'auth/register',
    ({username, email, password}: { username: string; password: string, email: string }, {rejectWithValue}) => {
        return axios.post('http://localhost:3200/api/register', {username, email, password})
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
export const login = createAsyncThunk(
    'auth/login',
    ({username, password}: { username: string; password: string }, {rejectWithValue}) => {
        return axios.post('http://localhost:3200/api/login', {username, password})
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
    reducers: {
        logout(state) {
            state.token = null;
            localStorage.removeItem('token');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'idle';
                state.token = action.payload;
                localStorage.setItem('token', action.payload);
            })
            .addCase(login.rejected, (state) => {
                state.status = 'failed';
            }).addCase(register.pending, (state) => {
            state.status = 'loading';
        }).addCase(register.fulfilled, (state, action) => {
            state.status = 'idle';
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
        }).addCase(register.rejected, (state) => {
            state.status = 'failed';
        });
    },
});

export default authSlice.reducer;