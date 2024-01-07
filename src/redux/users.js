import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    value: null,
  },
  reducers: {
    userUpdate(state, action) {
      state.value = {
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
      };
    },
  },
});

export const { userUpdate } = userSlice.actions;
export default userSlice.reducer;
