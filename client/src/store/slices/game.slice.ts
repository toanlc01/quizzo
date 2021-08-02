import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiUrl } from '../types';

interface State {
  roomId: string | undefined;
  role: 'host' | 'player' | undefined;
  userId: string | undefined;
  username: string | undefined;
  players: any[];
}

const initialState: State = {
  roomId: undefined,
  role: undefined,
  userId: undefined,
  username: undefined,
  players: []
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    updateGame: (state, action) => {
      state = { ...state, ...action.payload };
      console.log(state);
      return state;
    },
    playerJoin: (state, action) => {
      state.players = action.payload;
    }
  },
  extraReducers: {}
});

export default gameSlice.reducer;
export const { updateGame, playerJoin } = gameSlice.actions;
