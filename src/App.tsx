import { Authenticator } from "@aws-amplify/ui-react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <NavBar
            signOut={signOut}
            user={user}
          />
          <div className="container py-5">
            <Outlet />
          </div>
        </main>
      )}
    </Authenticator>
  );
}

export default App;
