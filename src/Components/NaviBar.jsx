import { NavLink, Link, useNavigate, Outlet } from "react-router-dom";
import axios from "axios";

function NaviBar() {
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      if (token) {
        await axios.post('http://localhost/tools_new/api/logout', {},
          {
            headers: {
              Authorization: `Bearer${token}`
            }
          }
        )
      }

    } catch (error) {
      console.error("Logout API error:", error.response?.data || error.message);
    }
    // Clear local storage regardless of API response
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Redirect to login
    navigate('/');



  }
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
                <form className="d-flex" onSubmit={handleLogout}>
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
