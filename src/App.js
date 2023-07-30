import "./App.css";
import NavBar from "./components/NavBar.js";
import PlaceList from "./components/PlaceList";

export default function App() {
  return (
    <main>
      <NavBar />
      <div className="container-xl">
        <PlaceList />
      </div>
    </main>
  );
}
