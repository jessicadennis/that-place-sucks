import { withAuthenticator } from "@aws-amplify/ui-react";
import { NavLink } from "react-router-dom";

function NavBar({ signOut, user }) {
  const pages = [
    {
      name: "Home",
      route: "/",
    },
    {
      name: "Add a place",
      route: "/add",
    },
  ];
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <a
          className="navbar-brand"
          href="/">
          That Place Sucks
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
          aria-controls="navMenu"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <i className="fa-solid fa-burger"></i>
        </button>
        <div
          className="collapse navbar-collapse"
          id="navMenu">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {pages.map((page) => (
              <li
                key={crypto.randomUUID()}
                className="nav-item">
                <NavLink
                  to={page.route}
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "nav-link active"
                      : isPending
                      ? "pending"
                      : "nav-link"
                  }>
                  {page.name}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false">
              {user.attributes?.given_name ?? ""}{" "}
              {user?.attributes?.family_name ?? ""}
            </button>
            <ul className="dropdown-menu">
              <li>
                <button
                  className="dropdown-item"
                  onClick={signOut}>
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default withAuthenticator(NavBar);
