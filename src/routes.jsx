import Chat from "./components/Chat/Chat";
import Video from "./components/Video/Video";
import { useRoutes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login/Login";

export default function useElement() {
  let element = useRoutes([
    {
      path: "/",
      index: true,
      element: <Home />,
    },
    {
      path: "/video",
      index: true,
      element: <Video />,
    },
    {
      path: "/login",
      index: true,
      element: <Login />,
    },
    {
      path: "/chat",
      element: <Chat />,
    },
  ]);

  return element;
}
