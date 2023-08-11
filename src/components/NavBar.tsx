import { WithAuthenticatorProps } from "@aws-amplify/ui-react";
import { faHamburger, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

export default function NavBar({ signOut, user }: WithAuthenticatorProps) {
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
    <nav
      className="navbar fixed-top bg-dark-subtle"
      data-bs-theme="dark">
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
          <FontAwesomeIcon icon={faHamburger} />
        </button>
        <div
          className="collapse navbar-collapse"
          id="navMenu">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item pb-2 border-bottom">
              <div className="d-flex align-items-center">
                <FontAwesomeIcon icon={faUser} />
                <span className="ms-2">
                  {user?.attributes?.given_name ?? ""}{" "}
                  {user?.attributes?.family_name ?? ""}
                </span>
                <button
                  className="btn btn-sm btn-dark ms-3"
                  type="button"
                  onClick={signOut}>
                  Log Out
                </button>
              </div>
            </li>
            {pages.map((page) => (
              <li
                key={crypto.randomUUID()}
                className="nav-item">
                <NavLink
                  to={page.route}
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "nav-link active disabled"
                      : isPending
                      ? "pending"
                      : "nav-link"
                  }>
                  {page.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
