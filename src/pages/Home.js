import { Link } from "react-router-dom";
import "./Home.css";
import ArticlesList from "../components/ArticlesList";
import { useFetch } from "../hooks/useFetch";

export default function Home() {
  const { articles, error, isPending } = useFetch();

  return (
    <div>
      <div className="pageHead">
        <h2>Articles</h2>
        <Link to="/Create">Create New Blog</Link>
      </div>
      <div className="home">
        {isPending && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {articles && <ArticlesList articles={articles} />}
      </div>
    </div>
  );
}
