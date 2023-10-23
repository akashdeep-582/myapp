import { useEffect, useMemo, useState } from "react";
import Card from "./Card/Card";
import "./Avatar.css";

const Avatar = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(query);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${debounced}`
      );
      if (response.ok) {
        const jsonData = await response.json();
        setData(jsonData.items);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  const sortedData = useMemo(() => {
    if (data && data.length) {
      let sorted = [...data];
      switch (sortBy) {
        case "stars":
          sorted.sort((a, b) => b.stargazers_count - a.stargazers_count);
          break;
        case "watchers":
          sorted.sort((a, b) => b.watchers - a.watchers);
          break;
        case "name":
          sorted.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "created":
          sorted.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
          break;
        case "updated":
          sorted.sort(
            (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
          );
          break;
        default:
          break;
      }
      return sorted;
    }
    return data;
  }, [data, sortBy]);

  useEffect(() => {
    fetchData();
  }, [debounced]);

  return (
    <div>
      {" "}
      <div style={{ display: "flex" }}>
        <div className="search-bar" style={{ flex: "1", marginRight: "10px" }}>
          <input
            type="text"
            placeholder="Search for repositories"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ width: "70%", padding: "10px" }}
          />
        </div>
        <div className="dropdown">
          Sort By {"  "}
          <select
            style={{ padding: "10px" }}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="stars">Stars</option>
            <option value="watchers">Watchers</option>
            <option value="name">Name</option>
            <option value="created">Created At</option>
            <option value="updated">Updated At</option>
          </select>
        </div>
      </div>
      <div className="container">
        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : (
          sortedData && !!sortedData.length &&
          sortedData.map((repo) => {
            return (
              <Card
                key={repo.id}
                name={repo.name}
                avatarUrl={repo.owner?.avatar_url}
                stars={repo.stargazers_count}
                description={repo.description}
                language={repo.language}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Avatar;
