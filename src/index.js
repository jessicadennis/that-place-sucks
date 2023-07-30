import "./index.css";
import App from "./App";
import ErrorPage from "./error-page";
import ReactDOM from "react-dom/client";
import awsExports from "./aws-exports";
import reportWebVitals from "./reportWebVitals";
import { Amplify } from "aws-amplify";
import { AmplifyProvider } from "@aws-amplify/ui-react";
import { React, StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

// FontAwesome
import "@fortawesome/fontawesome-free/css/fontawesome.css";
import "@fortawesome/fontawesome-free/css/solid.css";
import PlaceForm from "./PlaceForm";
import PlaceList from "./components/PlaceList";

Amplify.configure(awsExports);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <PlaceList />,
      },
      {
        path: "add",
        element: <PlaceForm />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
document.querySelector("html").setAttribute("data-bs-theme", "dark");

root.render(
  <StrictMode>
    <AmplifyProvider>
      <RouterProvider router={router} />
    </AmplifyProvider>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
