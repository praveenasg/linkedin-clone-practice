import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";
import type { IBioBase } from "@/types/profile";

// Define the initial state using that type
const initialState: IBioBase = {
  userId: "",
  profileBackgroundURL: "",
  profileURL: "",
  name: "",
  country: "",
  bio: "",
  state: "",
  city: "",
  school: "",
  pronouns: "",
};

export const fetchBio = createAsyncThunk(
  "bio/fetchBio",
  async (userId: string) => {
    const response = await fetch(`http://localhost:3000/api/profile/${userId}`);
    const data = await response.json();
    return data as IBioBase;
  }
);

export const bioSlice = createSlice({
  name: "bio",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateBioState: (state, action: PayloadAction<IBioBase>) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchBio.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});
export const selectBio = (state: RootState) => state.bio;

export const { updateBioState } = bioSlice.actions;
export default bioSlice.reducer;
