import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  currentUser: any | null
};

const initialState: AuthState  = {
  currentUser: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userChanged(state, action: PayloadAction<any | null>) {
      state.currentUser = action.payload;
    }
  }
});

export const {
  userChanged
 } = authSlice.actions;

export default authSlice.reducer;
