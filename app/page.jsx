"use client";
import { Feed } from "@components/Feed";
import { useEffect, useState } from "react";

const Home = () => {
  const [ip, setIp] = useState("");

  useEffect(() => {
    // Fetch the IP from the API route
    fetch("/api/get-ip")
      .then((response) => response.json())
      .then((data) => setIp(data))
      .catch((error) => console.error("Error fetching IP:", error));
  }, []);
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center"> AI powered prompts</span>
      </h1>
      <p className="desc text-center">
        Promptopia is an open-source AI prompting tool for the modern world to
        discover, create, and share creative prompts.
      </p>
      <Feed />
    </section>
  );
};

export default Home;
