import { AmplifyProvider } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import PlacesTable from "./components/PlacesTable.tsx";
import ErrorPage from "./components/error-page.jsx";
import "./index.css";
import ClearAll from "./pages/Clear.tsx";
import PlaceForm from "./pages/PlaceForm.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <PlacesTable />,
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
