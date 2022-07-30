import { useLocation } from "react-router-dom";
import ArticlesList from "../components/ArticlesList";
import { useFetch } from "../hooks/useFetch";
import "./SearchResult.css";

export default function SearchResult() {
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get("q");

  const { articles, error, isPending } = useFetch(query.toLowerCase());

  return (
    <div className="resultHead">
      {articles && articles.length === 0 && (
        <h2>No Search Result for "{query}"</h2>
      )}
      {(isPending || error) && !query && <h2>Search Result</h2>}
      {articles && articles.length !== 0 && (
        <h2>Search Result for "{query}"</h2>
      )}
      {isPending && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {articles && <ArticlesList articles={articles} />}
    </div>
  );
}
