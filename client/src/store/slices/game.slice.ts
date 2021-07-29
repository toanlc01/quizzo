import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiUrl } from '../types';

interface State {
  roomId: string | undefined;
  role: 'host' | 'player' | undefined;
}

const initialState: State = {
  roomId: undefined,
  role: undefined
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    updateGame: (state, action) => {
      state.roomId = action.payload.roomId;
      state.role = action.payload.role;
    }
  },
  extraReducers: {}
});

export default gameSlice.reducer;
export const { updateGame } = gameSlice.actions;
