import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Shimmer from "./Shimmer/Shimmer.jsx";

// Lazy-loaded components
const App = lazy(() => import("./App.jsx"));
const Home = lazy(() => import("./pages/Home.jsx"));
const VideoPlayer = lazy(() => import("./Videos/VideoPlayer.jsx"));
const Login = lazy(() => import("./User/Login.jsx"));
const LikedVideos = lazy(() => import("./User/LikedVideos.jsx"));
const Settings = lazy(() => import("./User/Settings.jsx"));
const Edit = lazy(() => import("./pages/Edit.jsx"));
const RegisterForm = lazy(() => import("./User/RegisterForm.jsx"));
const WatchHistory = lazy(() => import("./Videos/WatchHistory.jsx"));
const UploadVideo = lazy(() => import("./Videos/UploadVideos.jsx"));
const ChannelStats = lazy(() => import("./Dashboard/ChannelStats.jsx"));
const EditVideo = lazy(() => import("./Dashboard/EditVideo.jsx"));
const Help = lazy(() => import("./Help/Help.jsx"));
const ChannelVideos = lazy(() => import("./components/ChannelVideos.jsx"));
const ChannelVideo = lazy(() => import("./channnel/ChannelVideo.jsx"));
const ChannelAbout = lazy(() => import("./channnel/ChannelAbout.jsx"));
const ChannelSubscribers = lazy(() =>
  import("./channnel/ChannelSubscribers.jsx")
);
const MyChannel = lazy(() => import("./channnel/MyChannel.jsx"));


const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Shimmer />}>
        <App />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Shimmer />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/video/v/:videoId",
        element: (
          <Suspense fallback={<Shimmer />}>
            <VideoPlayer />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<Shimmer />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/user-register",
        element: (
          <Suspense fallback={<Shimmer />}>
            <RegisterForm />
          </Suspense>
        ),
      },
      {
        path: "/likedVideos",
        element: (
          <Suspense fallback={<Shimmer />}>
            <LikedVideos />
          </Suspense>
        ),
      },
      {
        path: "/user-details",
        element: (
          <Suspense fallback={<Shimmer />}>
            <Settings />
          </Suspense>
        ),
      },
      {
        path: "/user-edit",
        element: (
          <Suspense fallback={<Shimmer />}>
            <Edit />
          </Suspense>
        ),
      },
      {
        path: "/user-WatchHistory",
        element: (
          <Suspense fallback={<Shimmer />}>
            <WatchHistory />
          </Suspense>
        ),
      },
      {
        path: "/user-Upload",
        element: (
          <Suspense fallback={<Shimmer />}>
            <UploadVideo />
          </Suspense>
        ),
      },
      {
        path: "/user-ChannelSubscribers",
        element: (
          <Suspense fallback={<Shimmer />}>
            <ChannelSubscribers />
          </Suspense>
        ),
      },
      {
        path: "/user-Dashboard",
        element: (
          <Suspense fallback={<Shimmer />}>
            <ChannelStats />
          </Suspense>
        ),
      },
      {
        path: "/video/edit/:video_id",
        element: (
          <Suspense fallback={<Shimmer />}>
            <EditVideo />
          </Suspense>
        ),
      },
      {
        path: "/user-Help",
        element: (
          <Suspense fallback={<Shimmer />}>
            <Help />
          </Suspense>
        ),
      },
      {
        path: "/channelVideos/:userId",
        element: (
          <Suspense fallback={<Shimmer />}>
            <ChannelVideos />
          </Suspense>
        ),
      },
      {
        path: "/edit-video/:videoId",
        element: (
          <Suspense fallback={<Shimmer />}>
            <EditVideo />
          </Suspense>
        ),
      },
      {
        path: "/channel/:username",
        element: (
          <Suspense fallback={<Shimmer />}>
            <MyChannel />
          </Suspense>
        ),
        children: [
          {
            path: "videos",
            element: (
              <Suspense fallback={<Shimmer />}>
                <ChannelVideo />
              </Suspense>
            ),
          },
          {
            path: "subscribers",
            element: (
              <Suspense fallback={<Shimmer />}>
                <ChannelSubscribers />
              </Suspense>
            ),
          },
          {
            path: "about",
            element: (
              <Suspense fallback={<Shimmer />}>
                <ChannelAbout />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router}>
          <Toaster />
        </RouterProvider>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
