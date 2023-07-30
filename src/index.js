import "./index.css";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import awsExports from "./aws-exports";
import reportWebVitals from "./reportWebVitals";
import { Amplify } from "aws-amplify";
import { AmplifyProvider } from "@aws-amplify/ui-react";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

// FontAwesome
import "@fortawesome/fontawesome-free/css/fontawesome.css";
import "@fortawesome/fontawesome-free/css/solid.css";

Amplify.configure(awsExports);

const root = ReactDOM.createRoot(document.getElementById("root"));
document.getElementById("root").setAttribute("data-bs-theme", "dark");

root.render(
  <AmplifyProvider>
    <App />
  </AmplifyProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
