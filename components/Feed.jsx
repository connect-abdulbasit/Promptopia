"use client";
import { useEffect, useRef, useState } from "react";
import PromptCard from "./PromptCard";

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
  const [searchText, setsearchText] = useState("");
  const [post, setpost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredPrompts, setfilteredPrompts] = useState([]);

  const input = useRef(null);

  const handleSearchText = () => {
    setsearchText(input.current.value);

    if (input.current.value !== "") {
      const filteredData = post.filter((item) =>
        item.creator.username.includes(searchText)
      );
      console.log(filteredData);
      setfilteredPrompts(filteredData);
    } else {
      setfilteredPrompts(post);
    }
  };

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setpost(data);
      setfilteredPrompts(data);
    };

    fetchPrompts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a prompt"
          value={searchText}
          ref={input}
          onChange={handleSearchText}
          required
          className="search_input"
        />
      </form>
      <PromptCardList data={filteredPrompts} handleTagClick={() => {}} />
    </section>
  );
};
