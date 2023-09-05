import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

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

export default App;
