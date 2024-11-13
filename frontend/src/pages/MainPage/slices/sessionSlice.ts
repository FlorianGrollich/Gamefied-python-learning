import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface SessionState {
  code: string;
  isLoading: boolean;
  id?: string;
}

interface SessionResponse {
  id: string;
  code: string;
}

const initialState: SessionState = {
  code: 'from player import Player\nplayer = Player()\nplayer.move()',
  isLoading: false,
};

export const createNewSession = createAsyncThunk<SessionResponse, void>(
  'session/create',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/createSession`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setCode: (state, action: PayloadAction<string>) => {
      state.code = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createNewSession.pending, state => {
        state.isLoading = true;
      })
      .addCase(createNewSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.id = action.payload.id;
        state.code = action.payload.code;
      })
      .addCase(createNewSession.rejected, state => {
        state.isLoading = false;
        console.log('error when creating new session');
      });
  },
});

export const selectCode = (state: { session: SessionState }) => state.session.code;
export const selectId = (state: { session: SessionState }) => state.session.id;

export default sessionSlice.reducer;
export const { setCode } = sessionSlice.actions;