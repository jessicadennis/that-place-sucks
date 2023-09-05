import { AmplifyProvider, Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import awsconfig from "./aws-exports";
import PlacesTable from "./components/PlacesTable.tsx";
import { RequireAuth } from "./components/RequireAuth.tsx";
import ErrorPage from "./components/error-page.jsx";
import "./index.css";
import ClearAll from "./pages/Clear.tsx";
import PlaceForm from "./pages/PlaceForm.tsx";
import { Login } from "./components/Login.tsx";

Amplify.configure(awsconfig);

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
        path: "login",
        element: <Login />,
      },
      {
        path: "add",
        element: (
          <RequireAuth>
            <PlaceForm />
          </RequireAuth>
        ),
      },
      {
        path: "edit/:restaurantId",
        element: (
          <RequireAuth>
            <PlaceForm />
          </RequireAuth>
        ),
      },
      {
        path: "kill-all",
        element: (
          <RequireAuth>
            <ClearAll />
          </RequireAuth>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AmplifyProvider>
        <Authenticator.Provider>
          <RouterProvider router={router} />
        </Authenticator.Provider>
      </AmplifyProvider>
    </QueryClientProvider>
  </StrictMode>
);
