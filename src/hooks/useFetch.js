import { projectFirestore } from "../firebase/config";
import { useEffect, useState } from "react";

export const useFetch = (search, add) => {
  const [articles, setArticles] = useState(null);
  const [error, setError] = useState(false);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    setIsPending(true);

    const unsub = projectFirestore.collection("blogs").onSnapshot(
      (snapshot) => {
        if (snapshot.empty) {
          setError("No Blogs to load");
          setIsPending(false);
        } else {
          let results = [];
          if (search) {
            snapshot.docs.forEach((doc) => {
              if (doc.data().title.toLowerCase().includes(search))
                results.push({ id: doc.id, ...doc.data() });
            });
          } else {
            snapshot.docs.forEach((doc) => {
              results.push({ id: doc.id, ...doc.data() });
            });
          }
          setArticles(results);
          setIsPending(false);
        }
      },
      (err) => {
        setError(err.message);
        setIsPending(false);
      }
    );

    return () => unsub();
  }, [search, add]);
  return { articles, error, isPending };
};
