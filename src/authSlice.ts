import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  currentUser: any | null
};

const currentUser ="currentUser";

function getLocalCurrentUser() {
  let value = localStorage.getItem(currentUser);

  if (value) {
    value = JSON.parse(value);
  }

  return value;
}

const initialState: AuthState  = {
  currentUser: getLocalCurrentUser()
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userChanged(state, action: PayloadAction<any | null>) {
      state.currentUser = action.payload;
      try {
        if (action.payload) {
          localStorage.setItem(currentUser, JSON.stringify(action.payload));
        } else {
          localStorage.removeItem(currentUser);
        }
      }
      catch (error) {
        console.log("localStorage error:", error);
      }
    }
  }
});

export const {
  userChanged
 } = authSlice.actions;

export default authSlice.reducer;
