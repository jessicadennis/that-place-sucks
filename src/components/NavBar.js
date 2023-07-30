export default function NavBar() {
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
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="/">
                Home
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
