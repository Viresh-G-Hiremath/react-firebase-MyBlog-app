import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { projectFirestore } from "../firebase/config";
import { useFetch } from "../hooks/useFetch";
import "./Create.css";

export default function Create() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");
  const Navigate = useNavigate();

  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const id = queryParams.get("q");

  const { articles, isPending, error } = useFetch();

  useEffect(() => {
    if (id && articles) {
      const results = articles.find((article) => {
        return article.id === id;
      });
      setTitle(results.title);
      setAuthor(results.author);
      setBody(results.body);
    }
  }, [id, articles]);

  const handleCreate = async (e) => {
    e.preventDefault();
    let add = { title, author, body };
    if (id) {
      try {
        await projectFirestore.collection("blogs").doc(id).update(add);
        Navigate("/");
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await projectFirestore.collection("blogs").add(add);
        Navigate("/");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleCancel = () => {
    Navigate("/");
  };

  const handleReset = () => {
    setTitle("");
    setAuthor("");
    setBody("");
  };

  return (
    <div className="form">
      <h2>Create a Blog</h2>
      {isPending && id && <div>Loading...</div>}
      {error && <div>{error}</div>}
      <form onSubmit={handleCreate}>
        <label>
          <span>Article Title:</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          <span>Author:</span>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </label>
        <label>
          <span>Article Body:</span>
          <textarea
            value={body}
            cols="30"
            rows="10"
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </label>
        <div className="formBtns">
          {id ? <button>Update</button> : <button>Create</button>}
          <button type="reset" onClick={handleReset}>
            Reset
          </button>
          <button type="cancel" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
