import { createBrowserRouter, RouterProvider } from "react-router-dom";
const rootElement = document.getElementById("root");
import Loading from "./Pages/Loading.tsx";
import ReactDOM from "react-dom/client";
import Menu from "./Pages/Menu.tsx";
import App from "./App.tsx";
import React from "react";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Menu />,
  },

  {
    path: "/Top-Trumps",
    element: <App />,
  },
  {
    path: "Loading-Game",
    element: <Loading />,
  },
]);

// new
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

// old
// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );
