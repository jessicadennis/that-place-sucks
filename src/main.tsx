import { AmplifyProvider } from "@aws-amplify/ui-react";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import App from "./App.tsx";
import ErrorPage from "./components/error-page.jsx";
import Home from "./pages/Home.tsx";
import PlaceForm from "./pages/PlaceForm.tsx";
import ReactDOM from "react-dom/client";

import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "@aws-amplify/ui-react/styles.css";
import "./index.css";
import ClearAll from "./pages/Clear.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "add",
        element: <PlaceForm />,
      },
      {
        path: "edit/:restaurantId",
        element: <PlaceForm />,
      },
      {
        path: "login",
        element: <Home />,
      },
      {
        path: "kill-all",
        element: <ClearAll />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AmplifyProvider>
        <RouterProvider router={router} />
      </AmplifyProvider>
    </QueryClientProvider>
  </StrictMode>
);
