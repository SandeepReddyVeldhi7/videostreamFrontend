import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMenuOpen: false,
  showUploadVideo: false,
  showEditVideo: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toogleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    setShowUploadVideo: (state, action) => {
      state.showUploadVideo = action.payload;
    },
    setShowEditVideo: (state, action) => {
      state.showEditVideo = action.payload;
    },
  },
});

export const {toogleMenu, setSideBarFullSize, setShowUploadVideo, setShowEditVideo } =
  uiSlice.actions;
export default uiSlice.reducer;
