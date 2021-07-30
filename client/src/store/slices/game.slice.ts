import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiUrl } from '../types';

interface State {
  roomId: string | undefined;
  role: 'host' | 'player' | undefined;
  players: any[];
}

const initialState: State = {
  roomId: undefined,
  role: undefined,
  players: []
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    updateGame: (state, action) => {
      state.roomId = action.payload.roomId;
      state.role = action.payload.role;
    },
    joinPlayer: (state, action) => {
      console.log(action.payload);
      state.players.push(action.payload);
    }
  },
  extraReducers: {}
});

export default gameSlice.reducer;
export const { updateGame, joinPlayer } = gameSlice.actions;
