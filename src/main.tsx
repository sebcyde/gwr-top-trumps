import { createBrowserRouter, RouterProvider } from "react-router-dom";
const rootElement = document.getElementById("root");
import Loading from "./Pages/Loading.tsx";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import Menu from "./Pages/Menu.tsx";
import { store } from "./store";
import App from "./App.tsx";
import "./Styles/All.scss";
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

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
