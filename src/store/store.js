import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import uiSlice from "../features/uiSlice";
import videoSlice from "../features/videoSlice";
import channelSlice from "../features/channelSlice";
import searchSlice from "../features/searchSlice";


const store = configureStore({
  reducer: {
    auth: authSlice,
    search: searchSlice,
    ui: uiSlice,
    video: videoSlice,
    channel: channelSlice,
  },
});

export default store;