import { Amplify } from "aws-amplify";
import { AmplifyProvider } from "@aws-amplify/ui-react";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import App from "./App.tsx";
import awsExports from "./aws-exports";
import ErrorPage from "./components/error-page.jsx";
import Home from "./pages/Home.tsx";
import PlaceForm from "./pages/PlaceForm.tsx";
import ReactDOM from "react-dom/client";

import "bootstrap/dist/js/bootstrap.bundle.min";

import "./assets/scss/bootstrap.scss";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(awsExports);

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
        path: "login",
        element: <Home />,
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
