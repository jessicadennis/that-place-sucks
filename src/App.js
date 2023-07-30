import "./App.css";
import NavBar from "./components/NavBar.js";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <main>
      <NavBar />
      <div className="container py-5">
        <Outlet />
      </div>
    </main>
  );
}
