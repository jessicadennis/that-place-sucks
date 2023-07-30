import { NavLink } from "react-router-dom";

export default function NavBar() {
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
        </div>
      </div>
    </nav>
  );
}
