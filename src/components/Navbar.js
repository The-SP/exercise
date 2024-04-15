import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Users
        </Link>
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link text-primary" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-primary" to="/profile">
                Profile
              </Link>
            </li>
          </ul>
        </div>
    </nav>
  );
};

export default Navbar;
