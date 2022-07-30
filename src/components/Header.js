import { NavLink, Link } from "react-router-dom";
import "./Header.css";
import Search from "./Search";

export default function Header() {
  return (
    <nav>
      <div className="logo">
        <Link to="/">
          <h1>My Blog</h1>
        </Link>
      </div>
      <Search />
      <div className="media">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/About">About</NavLink>
        <NavLink to="/Contact">Contact Us</NavLink>
      </div>
    </nav>
  );
}
