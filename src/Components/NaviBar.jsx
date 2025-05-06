import { NavLink, Link, Outlet } from "react-router-dom";

function NaviBar() {
  return (
    <div>
      <div className="container-fluid">
      <div className="row">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              Logo
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarScroll"
              aria-controls="navbarScroll"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarScroll">
              <ul
                className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
                style={{ "--bs-scroll-height": "100px" }}
              >
                <li className="nav-item">
                  <NavLink className="nav-link" aria-current="page" to={"/home"} >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
								<NavLink className="nav-link" aria-current="page" to={"/about"} >
                    About
                  </NavLink>
                </li>
                <li className="nav-item">
								<NavLink className="nav-link" aria-current="page" to={"/qr_scanner"} >
                    QrScanner
                  </NavLink>
                </li>
                <li className="nav-item">
								<NavLink className="nav-link" aria-current="page" to={"/img_2_text"} >
                    Image2Text
                  </NavLink>
                </li>
              </ul>
              <form className="d-flex">
                <button className="btn btn-outline-success" type="submit">
                  Logout
                </button>
              </form>
            </div>
          </div>
        </nav>
      </div>
    </div>
    <Outlet />
    </div>
  );
}

export default NaviBar;
