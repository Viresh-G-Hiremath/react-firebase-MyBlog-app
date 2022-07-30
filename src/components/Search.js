import "./Search.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [term, setTerm] = useState("");
  const Navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (term !== "") Navigate(`/SearchResult?q=${term}`);
    setTerm("");
  };

  return (
    <div className="search">
      <form onSubmit={handleSearch}>
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </form>
    </div>
  );
}
