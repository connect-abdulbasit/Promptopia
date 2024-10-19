"use client";
import { useEffect, useRef, useState } from "react";
import PromptCard from "./PromptCard";
import Loader from "./Loader";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((prompt) => (
        <PromptCard
          key={prompt._id}
          post={prompt}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

export const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [filteredPrompts, setFilteredPrompts] = useState([]);
  const input = useRef(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const debounceSearch = setTimeout(() => {
      setSearching(true);
      if (searchText.trim() !== "" && searchText.trim() !== "#") {
        const filteredData = posts.filter((item) => {
          if (searchText.startsWith("#")) {
            const tag = searchText.toLowerCase();
            const tagsArray = item.tag.split(" ").map((t) => t.toLowerCase());

            return tagsArray.some((t) => t === tag);
          } else {
            return item.prompt.toLowerCase().includes(searchText.toLowerCase());
          }
        });
        setFilteredPrompts(filteredData);
      } else {
        setFilteredPrompts(posts);
      }
      setSearching(false);
    }, 500);

    return () => clearTimeout(debounceSearch);
  }, [searchText, posts]);

  useEffect(() => {
    const fetchPrompts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/prompt/all/${new Date().getDate()}`);
        if (!response.ok) throw new Error("Failed to fetch prompts");
        const data = await response.json();
        setPosts(data);
        setFilteredPrompts(data);
      } catch (err) {
        setError(true);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrompts();
  }, []);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a prompt"
          value={searchText}
          ref={input}
          onChange={handleSearchChange}
          required
          className="search_input"
        />
      </form>

      {loading ? (
        <Loader className="mt-32" />
      ) : error ? (
        <p className="mt-32 text-red-500">
          Error loading prompts. Please try again.
        </p>
      ) : (
        <PromptCardList data={filteredPrompts} handleTagClick={() => {}} />
      )}
    </section>
  );
};
