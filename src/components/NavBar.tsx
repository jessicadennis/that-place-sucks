import { useAuthenticator } from "@aws-amplify/ui-react";
import { faHamburger, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQueryClient } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";

export default function NavBar() {
  const { route, user, signOut } = useAuthenticator((context) => [
    context.route,
    context.signOut,
  ]);
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const pages = [
    {
      id: 0,
      name: "Home",
      route: "/",
    },
    {
      id: 1,
      name: "Add a place",
      route: "/add",
    },
  ];

  function logOut() {
    signOut();
    queryClient.invalidateQueries();
    navigate("/");
  }

  return (
    <nav
      className="navbar fixed-top main-navigation"
      data-bs-theme="dark">
      <div className="container">
        <NavLink
          to={"/"}
          className={"navbar-brand"}>
          That Place Sucks
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-target="#navMenu"
          aria-controls="navMenu"
          data-bs-toggle="offcanvas"
          aria-label="Toggle navigation">
          <FontAwesomeIcon icon={faHamburger} />
        </button>
        <div
          className="offcanvas offcanvas-end"
          tabIndex={-1}
          id="navMenu">
          <div className="offcanvas-header">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item pb-2 border-bottom border-secondary">
                <div className="d-flex align-items-center">
                  <FontAwesomeIcon icon={faUser} />
                  {route !== "authenticated" ? (
                    <NavLink
                      className={({ isActive, isPending }) =>
                        isActive
                          ? "nav-link ms-3 active disabled"
                          : isPending
                          ? "pending"
                          : "nav-link ms-3"
                      }
                      to={"/login"}>
                      Log in
                    </NavLink>
                  ) : (
                    <>
                      <span className="ms-2">
                        {user?.attributes?.given_name ?? ""}{" "}
                        {user?.attributes?.family_name ?? ""}
                      </span>
                      <button
                        className="btn btn-sm btn-outline-light ms-3"
                        type="button"
                        onClick={logOut}>
                        Log Out
                      </button>
                    </>
                  )}
                </div>
              </li>
              {pages.map((page) => (
                <li
                  key={page.id}
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
      </div>
    </nav>
  );
}
