import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IinitialState {
  isAuthenticated: boolean;
  token: string | null;
}

const initialState: IinitialState = {
  isAuthenticated: false,
  token: null,
};

export const currentUserSlice = createSlice({
  name: "current",
  initialState,
  reducers: {
    addCurrent: (state, action: PayloadAction<IinitialState>) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.token = action.payload.token;
    },
    removeCurrent: () => initialState,
  },
});

export const { addCurrent, removeCurrent } = currentUserSlice.actions;
