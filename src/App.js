import "./App.css";
import NavBar from "./components/NavBar.jsx";
import { Outlet } from "react-router-dom";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

function App() {
  return (
    <main>
      <NavBar />
      <div className="container py-5">
        <Outlet />
      </div>
    </main>
  );
}

export default withAuthenticator(App);
