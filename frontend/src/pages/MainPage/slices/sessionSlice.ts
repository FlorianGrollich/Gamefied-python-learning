import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';


interface SessionState {
  code: string;
  isLoading: boolean;
}


const initialState: SessionState = {
  code: 'from player import Player\nplayer = Player()\nplayer.move()',
  isLoading: false,
};


export const createNewSession = createAsyncThunk(
  'session/create',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/createSession`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return { type: 'session/create', payload: response.data };
    } catch (error) {
      return rejectWithValue(error);
    }
  });


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
      .addCase(createNewSession.fulfilled, state => {
        state.isLoading = false;
      }).addCase(createNewSession.rejected, state => {
      state.isLoading = false;
      console.log('error when creating new session');
    });
  },

});

export default sessionSlice.reducer;
export const { setCode } = sessionSlice.actions;


