import "./ArticlesList.css";
import { Link, useNavigate } from "react-router-dom";
import { projectFirestore } from "../firebase/config";

export default function ArticlesList({ articles }) {
  const Navigate = useNavigate();

  const handleDelete = (e, id) => {
    e.preventDefault();
    projectFirestore.collection("blogs").doc(id).delete();
  };

  const handleUpdate = (e, id) => {
    e.preventDefault();
    Navigate(`/Create?q=${id}`);
  };

  return (
    <div className="articleList">
      {articles.map((article) => (
        <Link to={`/Article/${article.id}`} key={article.id}>
          <div className="articles">
            <div className="artHead">
              <h3>{article.title}</h3>
              {article.author && <p>By: {article.author}</p>}
            </div>
            <div className="art-btn">
              <button onClick={(e) => handleDelete(e, article.id)}>
                Delete
              </button>
              <button onClick={(e) => handleUpdate(e, article.id)}>Edit</button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
