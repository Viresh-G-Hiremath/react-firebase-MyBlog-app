import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import "./Article.css";

export default function Article() {
  const [article, setArticle] = useState(null);
  const { id } = useParams();
  const { articles, isPending, error } = useFetch();

  useEffect(() => {
    if (articles) {
      const results = articles.find((article) => {
        return article.id === id;
      });
      setArticle(results);
    }
  }, [articles, id]);

  return (
    <div className="article">
      <h2>Article</h2>
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {article && (
        <div>
          <h3>{article.title}</h3>
          {article.author && <p>By: {article.author}</p>}
          <p>{article.body}</p>
        </div>
      )}
    </div>
  );
}
